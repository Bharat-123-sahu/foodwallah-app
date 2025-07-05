const express = require("express");
const router = express.Router();
const { placeOrder, getOrders,updateStatus,
  markPaid } = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, placeOrder);
router.get("/", verifyToken, getOrders);

// 👨‍💼 Admin update status
router.put("/status/:orderId", updateStatus);

// 💳 User marks payment
router.put("/pay/:orderId", verifyToken, markPaid);
// Note: The verifyToken middleware is applied to the placeOrder and getOrders routes
// to ensure that only authenticated users can place orders and view their orders.
module.exports = router;
