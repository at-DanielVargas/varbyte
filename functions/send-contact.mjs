import { Resend } from "resend";

export const handler = async function (event) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, message } = JSON.parse(event.body);

    const data = await resend.emails.send({
      from: "contact@varbyte.dev",
      to: process.env.EMAILJS_TO_EMAIL,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
