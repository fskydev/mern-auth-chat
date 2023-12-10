import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import validator from "validator";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with the given email already exists...");
  }

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email must be a valid email...");
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error("Password must be a strong password...");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({ _id: user._id, name, email });
  } else {
    res.status(500);
    throw new Error("Registration failed...");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({ _id: user._id, name: user.name, email });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const findUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    if (req.body.password) {
      if (!validator.isStrongPassword(req.body.password)) {
        res.status(400);
        throw new Error("Password must be a strong password...");
      }
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  findUser,
  getUsers,
  updateProfile,
};
