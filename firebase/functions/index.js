
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// ------------------------------------------------------------------------------------------->>>>

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "9415830@gmail.com", // Replace with your email
    pass: "nxou xtww gfne mykh", // Use an App Password (Not your actual password)
  },
});

// This is cloud function to send an email(it is serverless function)
exports.sendOrderConfirmationEmail = functions.https.onCall(
  async (data, context) => {
    const { email, name, orderId } = data;

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Order Confirmation",
      html: `<h2>Hello ${name},</h2><p>Thank you for your order! Your order ID is <strong>${orderId}</strong>.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email sent successfully!" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: error.message };
    }
  }
);
