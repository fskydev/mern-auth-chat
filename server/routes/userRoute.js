const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  findUser,
  getUsers,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/find/:userId", protect, findUser);
router.get("/", protect, getUsers);

module.exports = router;
