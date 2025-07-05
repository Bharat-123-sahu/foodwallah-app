const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
   const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalAmount
    });

    await newOrder.save();
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Order error", error: err.message });
  }
};

exports.getOrders = async (req, res) => {
   const userId = req.user.userId;

  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Fetch order error" });
  }
};
exports.placeOrder = async (req, res) => {
  const userId = req.user.userId;
  // fetch cart & place order
};

exports.getOrders = async (req, res) => {
  const userId = req.user.userId;
  const orders = await Order.find({ userId }).populate("items.productId");
  res.json(orders);
};
// 👨‍💼 Admin: Update order status
exports.updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// 💳 User: Mark payment as done
exports.markPaid = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { isPaid: true }, { new: true });
    res.json({ message: "Payment marked", order });
  } catch (err) {
    res.status(500).json({ message: "Payment update failed", error: err.message });
  }
};
