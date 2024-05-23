const nodemailer = require("nodemailer");
const fs = require("fs");
// const { generateEmailHTML } = require("../helper/");
const emailTemplate = fs.readFileSync(
  "/home/stavan/Documents/aspire/e-comsite/backend/helper/emailTemplate.html",
  "utf-8"
);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendVerificationEmail = async (user, token) => {
  const url = `http://localhost:${process.env.PORT}/api/users/verify/${token}`;
  const emailBody = emailTemplate.replace("{{verificationUrl}}", url);
  await transporter.sendMail({
    to: user.email,
    subject: "Verify your email",
    html: emailBody,
  });
};

module.exports = sendVerificationEmail;
