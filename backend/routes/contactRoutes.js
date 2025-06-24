const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact"); // <== ADD THIS LINE

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // ✅ Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent and saved!" });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
