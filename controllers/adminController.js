const Order = require("../models/Order");

// 👁 Get all orders with user + items
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// 🔍 Filter by status
exports.filterOrders = async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ status })
      .populate("userId", "name email")
      .populate("items.productId", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Filter error", error: err.message });
  }
};
// 👨‍💼 Admin: Update order status