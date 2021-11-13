import dbConnect from "../../../../utils/dbConnect";
import Hotel from "../../../../models/hotel";

dbConnect();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const hotel = await Hotel.findOne({email: req.query.email});
    const newMenu = hotel.menu.filter((item) => item._id === id);

    const newHotel = await Hotel.findOneAndUpdate(
      { email },
      { menu: newMenu },
      { new: true }
    );

    res.status(200).json(newHotel.menu);
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
}
