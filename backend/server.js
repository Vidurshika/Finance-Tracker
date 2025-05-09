require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

const app = express();

// Handling CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth",authRoutes);// url = METHOD /api/v1/auth/..
app.use("/api/v1/income",incomeRoutes);


//serves uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
/* Without that line, even if the file is uploaded successfully, the browser won't be able to access that URL (/uploads/sunset.png) 
  This is for serving static files (like an image after it's uploaded).
  It handles a GET request.
  It tells the browser: “When you visit /uploads/filename.jpg, show that file from the folder.”
  It makes uploaded files publicly viewable via browser.
  So this is for viewing/accessing the uploaded image. */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
