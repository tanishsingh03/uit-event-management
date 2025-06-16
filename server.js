const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8778;
//const mongoURI = "mongodb+srv://tanish:...@cluster0.ykxsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00";
const mongoURI = "mongodb://localhost:27017/hh"; // Local MongoDB URI for testing
// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(uploadDir));

// Connect to MongoDB Atlas
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Mongoose Schema & Model
// const eventSchema = new mongoose.Schema({
//     name: String,
//     date: String,
//     location: String,
// });
// const Event = mongoose.model("Event", eventSchema);
//const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    category: { type: String, required: true },
    date: { type: String, required: true },
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventLocation: { type: String, required: true },
    audienceSize: { type: Number, required: true },
    organizerName: { type: String, required: true },
    organizerEmail: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

// Routes
app.get("/", (req, res) => res.render("landing")); // Ensure 'views/landing.ejs' exists
app.get("/role", (req, res) => res.render("role")); // Ensure 'views/role.ejs' exists
app.get("/sponserlogin", (req, res) => res.render("sponserlogin")); // Ensure 'views/sponserlogin.ejs' exists
app.get("/studentlogin", (req, res) => res.render("studentlogin")); // Ensure 'views/studentlogin.ejs' exists
app.get("/club", (req, res) => res.render("club")); // Ensure 'views/club.ejs' exists
app.get("/eventDetails", (req, res) => res.render("eventDetails")); // Ensure 'views/eventDetails.ejs' exists
app.get("/studentregis", (req, res) => res.render("studentregis")); // Ensure 'views/studentregis.ejs' exists
app.get("/radhika", (req, res) => res.render("radhika")); // Ensure 'views/radhika.ejs' exists
app.get("/evm", (req, res) => res.render("eventform")); // Ensure 'views/eventform.ejs' exists
// Handle Form Submission
app.post("/submit-event", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.json({ success: true, message: "✅ Event saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving event:", error);
        res.status(500).json({ success: false, message: "❌ Error saving event" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
