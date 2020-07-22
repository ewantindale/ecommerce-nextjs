const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
