import express from "express";
import {
  getItem,
  getItems,
  getItemsBySearch,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/items.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getItemsBySearch);
router.get("/", getItems);
router.get("/:id", getItem);

router.post("/", auth, createItem);
router.patch("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

export default router;
