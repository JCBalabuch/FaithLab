// Imports
const nodemailer = require('nodemailer');

// Function to send email
const sendEmail = async (to, name, password) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Bienvenid@ a tu Plataforma de formación como catequista',
    text: `
        ${name}, bienvenid@ a la Plataforma de la Escuela de Formación para Catequistas 
        de la Diócesis de Ciudad Guayana.

        Tu cuenta ha sido creada y tu contraseña es ${password}.

        Te invitamos a validar tu registro y cambiar tu contraseña en el siguiente link.

        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error({ message: `Error sending email`, error });
  }
};

module.exports = { sendEmail };
