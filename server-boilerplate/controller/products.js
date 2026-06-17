// https://mongoosejs.com/docs/queries.html
const mongoose = require("mongoose");
const model = require("../model/product");
const Product = model.Product;

/* =========================
   CREATE PRODUCT
========================= */
exports.create = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is empty",
      });
    }

    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL PRODUCTS
========================= */
exports.getAllData = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET PRODUCT BY ID
========================= */
exports.getData = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =========================
   REPLACE (PUT)
========================= */
exports.replaceData = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await Product.findOneAndReplace(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(doc);
  } catch (error) {
    console.error("REPLACE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   UPDATE (PATCH)
========================= */
exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!doc) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(doc);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   DELETE
========================= */
exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await Product.findOneAndDelete({ _id: id });

    if (!doc) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(doc);
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};