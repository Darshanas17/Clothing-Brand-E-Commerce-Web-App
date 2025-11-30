const bcrypt = require("bcryptjs");
const User = require("../models/User");
const createToken = require("../utils/token");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hash });

    const token = createToken({ id: user._id, email: user.email });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res
      .status(201)
      .json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken({ id: user._id, email: user.email });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
};
