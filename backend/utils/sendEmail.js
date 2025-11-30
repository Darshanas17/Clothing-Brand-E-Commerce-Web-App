const nodemailer = require("nodemailer");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (order, userEmailOrId) => {
  let to = userEmailOrId;
  if (!to.includes("@")) {
    const u = await User.findById(userEmailOrId);
    to = u?.email;
  }

  const itemsHtml = order.items
    .map((i) => `<li>${i.name} (${i.size}) x${i.qty} — ₹${i.price}</li>`)
    .join("");
  const html = `
    <h2>Thank you for your order!</h2>
    <p>Order ID: <b>#${order._id}</b></p>
    <p>Date: ${new Date(
      order.orderDate || order.createdAt
    ).toLocaleString()}</p>
    <h3>Items</h3>
    <ul>${itemsHtml}</ul>
    <h3>Total: ₹${order.totalPrice}</h3>
    <p>We'll process your order and update you with shipping details.</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order Confirmation - #${order._id}`,
    html,
  };

  return transporter.sendMail(mailOptions);
};
