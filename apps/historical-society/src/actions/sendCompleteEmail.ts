'use server';
import CuratorsRequestCompleteEmail from '@/emails/CuratorsRequestCompleteEmail';
import { render } from '@react-email/render';
import { Resend } from 'resend';

export const sendCompleteEmail = async (email: string, name: string) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.emails.send({
      from: 'James Chen <curator@whhs.info>',
      to: `${name} <${email}>`,
      bcc: 'Robin Goudeketting <r.goudeketting@gmail.com>',
      subject: 'Issue Resolved - Thank you!',
      html: await render(CuratorsRequestCompleteEmail({ name })),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    const goudekettingResponse = await fetch(`${process.env.GOUDEKETTING_BASE_URL}/api/hollowbrook-complete`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Origin-Authentication': process.env.API_ORIGIN_AUTHENTICATION || '',
      },
    });

    if (!goudekettingResponse.ok) {
      const errorResponse = (await goudekettingResponse.json()) as { message: string };
      throw new Error(errorResponse.message);
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
