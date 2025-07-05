const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/Products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

// Optional: Other HTML page routes
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','about.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','menu.html'));
});

app.get('/book', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','book.html'));
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cloudkitchen";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));
