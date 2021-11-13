import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/dbConnect";
import Hotel from "../../../models/hotel";

dbConnect();

export default async function handler(req, res) {
  const { email, password } = req.body;
  try {
    const existingHotel = await Hotel.findOne({ email });
    if (!existingHotel)
      return res.status(404).json({ message: "Hotel does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingHotel.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const hotelData = {
			name: existingHotel.name,
			email: existingHotel.email,
			id: existingHotel._id.toString(),
		};

    const token = jwt.sign(
      { email: existingHotel.email, id: existingHotel._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ hotelData, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}
