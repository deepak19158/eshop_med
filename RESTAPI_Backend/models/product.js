const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price must be provided"],
  },
  pack: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: [true, "price must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
