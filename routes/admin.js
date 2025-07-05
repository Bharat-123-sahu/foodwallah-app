const express = require("express");
const router = express.Router();
const { getAllOrders, filterOrders } = require("../controllers/adminController");

router.get("/orders", getAllOrders); // All orders
router.get("/orders/status/:status", filterOrders); // Filtered

module.exports = router;
