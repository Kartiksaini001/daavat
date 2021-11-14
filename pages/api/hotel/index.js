import dbConnect from "../../../utils/dbConnect";
import Hotel from "../../../models/hotel";

dbConnect();

export default async function handler(req, res) {
  try {
    const hotels = await Hotel.find();
    const result = hotels.map(({ name, email, _id, mapLocation }) => ({
      name,
      email,
      mapLocation,
      id: _id,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
}
