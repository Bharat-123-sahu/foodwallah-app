const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");
const verifyToken = require("../middleware/authMiddleware");


router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart); // We'll use req.user.userId here

module.exports = router;
