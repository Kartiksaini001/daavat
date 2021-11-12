import mongoose from "mongoose";
import Item from "../models/item.js";

export const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    // Get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Item.countDocuments({});

    const items = await Item.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: items,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItemsBySearch = async (req, res) => {
  // const { searchQuery, tags } = req.query;
  // try {
  //   const title = new RegExp(searchQuery, "i");
  //   const items = await Item.find({
  //     $or: [{ title }, { tags: { $in: tags.split(",") } }],
  //   });
  //   res.json({ data: items });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item({
    ...item,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newItem.save();

    res.status(201).json(newItem._id);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  // const { id: _id } = req.params;
  // const item = req.body;
  // if (!mongoose.Types.ObjectId.isValid(_id))
  //   return res.status(404).send("No item with that id");
  // const updatedItem = await Item.findByIdAndUpdate(
  //   _id,
  //   { ...item, _id },
  //   { new: true }
  // );
  // res.json(updatedItem);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No item with that id");

  await Item.findByIdAndRemove(id);

  res.json({ message: "Item deleted successfully" });
};
