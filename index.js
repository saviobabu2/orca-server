const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv =require("dotenv")
const database = require('./config/DB');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Serve React front-end
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


database.dbConnect();
