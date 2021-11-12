import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  parameter: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  selectedFile: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
