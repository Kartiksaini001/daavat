import dbConnect from "../../../utils/dbConnect";
import Hotel from "../../../models/hotel";

dbConnect();

export default async function handler(req, res) {
  const { email } = req.body;
  const newData = req.body;
  delete newData.email;

  try {
    const hotel = await Hotel.findOneAndUpdate(
      { email },
      { ...newData },
      { new: true }
    );

    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
}
