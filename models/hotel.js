import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // mapLocation: { type: String, required: true },
  // minOrder: Number,
  // menu: [],
});

module.exports = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
