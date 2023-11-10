import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  findUser,
  getUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/find/:userId", protect, findUser);
router.get("/", protect, getUsers);

export default router;
