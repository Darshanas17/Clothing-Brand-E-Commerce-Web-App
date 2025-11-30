const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res, next) => {
  try {
    if (!req.user) return res.json({ items: [] }); // frontend handles guest cart in localStorage
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, size, qty = 1 } = req.body;
    if (!req.user)
      return res
        .status(401)
        .json({ message: "Login required to save server-side cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existing = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );
    if (existing) {
      existing.qty += Number(qty);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        size,
        qty,
        price: product.price,
        image: product.image,
      });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { itemId, qty } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.qty = Number(qty);
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.id(itemId).remove();
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};
