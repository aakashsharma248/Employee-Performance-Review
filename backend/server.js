const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const cookieParser = require("cookie-parser");
const path = require("path");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes);
app.use(cookieParser({
  secure: process.env.NODE_ENV === "Development" ? false : true, // Ensure cookies are only transmitted over HTTPS
  sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
}));

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}


// MongoDB Connection

const connectDatabase = () => { 
  mongoose.connect(process.env.DB_URI, {
}).then((data) => {
  console.log(`Connected to MongoDB: ${data.connection.port}`);
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
}

// Start the server
 connectDatabase();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
