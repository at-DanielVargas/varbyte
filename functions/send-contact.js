const emailjs = require("@emailjs/nodejs");

exports.handler = async function (event, context) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        to_email: process.env.EMAILJS_TO_EMAIL,
        message: message,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: response }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
