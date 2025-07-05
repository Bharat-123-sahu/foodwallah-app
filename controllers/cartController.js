const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const {  productId, quantity } = req.body;
    const userId = req.user.userId; // from token

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Cart error", error: err.message });
  }
};

exports.getCart = async (req, res) => {
    const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.status(200).json(cart);
    console.log(cart)
  } catch (err) {
    res.status(500).json({ message: "Cart fetch error" });
  }
};
