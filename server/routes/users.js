import express from "express";
import { getUser, updateActivity, login, register } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUser);
router.patch("/:task", auth, updateActivity);
router.post("/login", login);
router.post("/register", register);

export default router;
