import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/user";

dbConnect();

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // login
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid Credentials" });

      const userData = {
				name: existingUser.name,
				email: existingUser.email,
				id: existingUser._id.toString(),
			};

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ userData, token });
    } else {
      // Register
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = new User({
        email,
        password: hashedPassword,
        name,
      });

      await result.save((err) => {
        console.log(err);
      });

      const userData = {
        name: result.name,
        email: result.email,
      };

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ userData, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
}
