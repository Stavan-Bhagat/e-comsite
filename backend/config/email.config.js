const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const emailTemplatePath = path.resolve(
  __dirname,
  "../helper/emailTemplate.html"
);
const { emailSubject, serviceName } = require("../constant/email.constant");

const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
const transporter = nodemailer.createTransport({
  service: serviceName,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (user, token) => {
  const url = `http://localhost:${process.env.PORT}/submit/verify/${token}`;
  const emailBody = emailTemplate.replace("{{verificationUrl}}", url);
  await transporter.sendMail({
    to: user.email,
    subject: emailSubject,
    html: emailBody,
  });
};

module.exports = sendVerificationEmail;
