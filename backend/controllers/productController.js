const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 0,
      search,
      category,
      size,
      minPrice,
      maxPrice,
    } = req.query;

    const pageNum = Number(page);
    const lim = Number(limit);

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "All") query.category = category;
    if (size) query.sizes = size;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((pageNum - 1) * lim)
      .limit(lim);

    res.json({ products, page: pageNum, pages: Math.ceil(total / lim), total });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};
