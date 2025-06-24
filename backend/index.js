const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(express.static(path.join(__dirname, "../public")));
// app.use("/api/contact", contactRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
