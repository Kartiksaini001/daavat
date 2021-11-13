import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mapLocation: { lat: Number, lng: Number },
  minOrder: { type: Number, default: 0 },
  menu: [
    {
      name: { type: String, required: true },
      desc: { type: String, required: true },
      price: { type: Number, default: 150, required: true },
    },
  ],
});

module.exports = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
