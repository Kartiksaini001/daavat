import dbConnect from "../../../../utils/dbConnect";
import Hotel from "../../../../models/hotel";

dbConnect();

export default async function handler(req, res) {
  const { email } = req.body;
  const newData = req.body;
  delete newData.email;

  switch (req.method) {
    case "GET":
      try {
        const hotel = await Hotel.findOne({ email });

        res.status(200).json(hotel.menu);
      } catch (error) {
        res.status(400).json({ msg: error.msg });
      }
      break;
    case "PATCH":
      try {
        const hotel = await Hotel.findOne({ email });
        const newMenu = hotel.menu;

        newMenu.push(newData);
        const newHotel = await Hotel.findOneAndUpdate(
          { email },
          { menu: newMenu },
          { new: true }
        );

        res.status(200).json(newHotel.menu);
      } catch (error) {
        res.status(400).json({ msg: error.msg });
      }
      break;
    default:
      break;
  }
}
