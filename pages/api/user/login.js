import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/user";

dbConnect();

export default async function handler(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const userData = {
      name: existingUser.name,
      email: existingUser.email,
    };

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}
