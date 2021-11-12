import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // mapLocation: { type: String, required: true },
  // minOrder: Number,
  // menu: [],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
