const nodemailer = require("nodemailer");
const logger =  require('./../config/logger');
const config = require('./../config/config');
const {delay,loggerStep} = require('./utils');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // use TLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

const sendEmail = async (params) => {
  const info = await transporter.sendMail({
    from: config.EMAIL_FROM, // sender address
    to: config.NOTIFY_EMAILS, // list of receivers
    subject: "Hello US VISA schedules", // Subject line
    ...params
  },
  (error) => {
    if (error) {
      return logger.error("There was an error: " + error);
    }
    loggerStep("Email sent successfully");
  });
};

module.exports = {
   sendEmail
}
