const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../controllers/productcontroller");

router.get("/", getAllProducts);
router.post("/", addProduct); // 👈 This is for POST request

module.exports = router;
