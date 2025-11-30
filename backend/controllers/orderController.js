const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const sendOrderEmail = require("../utils/sendEmail");

exports.placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart empty" });

    // Optional: validate stock
    for (const item of cart.items) {
      const p = await Product.findById(item.product);
      if (!p)
        return res
          .status(400)
          .json({ message: `Product ${item.name} no longer available` });
      if (p.stock < item.qty)
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${p.name}` });
    }

    const totalPrice = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

    const order = await Order.create({
      user: userId,
      items: cart.items.map((i) => ({
        product: i.product,
        name: i.name,
        size: i.size,
        qty: i.qty,
        price: i.price,
      })),
      totalPrice,
      shippingAddress,
    });

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    cart.items = [];
    await cart.save();

    await sendOrderEmail(order, req.user.email || req.user.email);

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};
