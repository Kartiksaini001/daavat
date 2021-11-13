import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/dbConnect";
import Hotel from "../../../models/hotel";

dbConnect();

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel)
      return res.status(400).json({ message: "Hotel already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = new Hotel({
      email,
      password: hashedPassword,
      name,
    });

    await result.save((err) => {
      console.log(err);
    });

    const hotelData = {
			name: result.name,
			email: result.email,
			id: result._id.toString(),
		};

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ hotelData, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
}
