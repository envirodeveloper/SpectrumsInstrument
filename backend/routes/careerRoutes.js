const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const upload = require("../middleware/upload");
const nodemailer = require("nodemailer");

console.log("Career form hit");

router.post("/", upload.single("resume"), async (req, res) => {
  const { fullname, address, phone, qualification } = req.body;

  if (!fullname || !address || !phone || !qualification || !req.file) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }

  try {
    const career = new Career({
      fullname,
      address,
      phone,
      qualification,
      resume: req.file.filename,
    });
    await career.save();

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
      subject: `New Career Application from ${fullname}`,
      text: `Name: ${fullname}\nPhone: ${phone}\nQualification: ${qualification}\nAddress: ${address}`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    });
console.log("Sending response...");
    res.status(200).json({ success: true, message: "Application submitted!" });
  } catch (err) {
    console.error("Career error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
