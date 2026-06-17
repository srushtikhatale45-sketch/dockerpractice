const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPercentage: {
      type: Number,
      min: [0, "Min discount is 0"],
      max: [20, "Max discount is 20"],
      default: 0,
    },

    rating: {
      type: Number,
      min: [0, "Min rating is 0"],
      max: [5, "Max rating is 5"],
      default: 0,
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },

    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Handle duplicate key error nicely
productSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("Duplicate title not allowed"));
  } else {
    next(error);
  }
});

exports.Product = mongoose.model("Product", productSchema);