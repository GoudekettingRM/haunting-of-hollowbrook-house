'use server';
import CuratorsRequestEmail from '@/emails/CuratorsRequestEmail';
import { render } from '@react-email/render';
import { Resend } from 'resend';

export const sendEmail = async (email: string, name: string) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.emails.send({
      from: 'James Chen <curator@whhs.info>',
      to: `${name} <${email}>`,
      bcc: 'Robin Goudeketting <r.goudeketting@gmail.com>',
      subject: 'Technical Issues - Need Your Expertise',
      html: await render(CuratorsRequestEmail({ name })),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      error: (error as Error).message,
      success: false,
    };
  }
};
