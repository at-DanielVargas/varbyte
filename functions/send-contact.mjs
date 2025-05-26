import fetch from "node-fetch";

exports.handler = async function (event, context) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            to_email: process.env.EMAILJS_TO_EMAIL,
            message: message,
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.text || "Error al enviar el correo");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: result }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
