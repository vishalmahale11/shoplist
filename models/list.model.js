const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    timestamps: { type: String },
  },
  {
    timestamps: true,
  }
);

const shoplistModel = mongoose.model("list", listSchema);

module.exports = shoplistModel;
