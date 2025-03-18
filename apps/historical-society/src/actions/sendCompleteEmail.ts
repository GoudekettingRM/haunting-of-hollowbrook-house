'use server';

export const sendCompleteEmail = async (email: string, name: string) => {
  try {
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
