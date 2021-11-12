import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  contact: { type: Number, required: true },
  listings: [String],
  hirings: [String],
});

export default mongoose.model("User", userSchema);
