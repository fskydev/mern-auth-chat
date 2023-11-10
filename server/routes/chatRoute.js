import express from "express";
import {
  createChat,
  findUserChats,
  findChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
