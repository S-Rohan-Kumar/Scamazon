import { APIResponse } from "../utils/api-response.js";
import { APIError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new APIError(400, "User already exists");
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    throw new APIError(400, "Invalid user data");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" },
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });

  return res
    .status(201)
    .json(new APIResponse(201, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new APIError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError(404, "Invalid credentials");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new APIError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" },
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });

  const loggedUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new APIResponse(200, loggedUser, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    expires: new Date(0),
  });
  return res
    .status(200)
    .json(new APIResponse(200, null, "User logged out successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select("-password");
  if (!user) {
    throw new APIError(404, "User not found");
  }

  return res
    .status(200)
    .json(new APIResponse(200, user, "User profile fetched successfully"));
});

//desc update user details
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select("-password");
  if (!user) {
    throw new APIError(404, "User not found");
  }

  user.name = req.body.name || user.name;

  return res
    .status(200)
    .json(new APIResponse(200, user, "User profile updated successfully"));
});

//@desc Get usrs
//@route GET /api/users
//@access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res
    .status(200)
    .json(new APIResponse(200, users, "All users fetched successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new APIError(404, "User not found");
  }

  return res
    .status(200)
    .json(new APIResponse(200, user, "User fetched successfully"));
});

//desc delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new APIError(404, "User not found");
  }
  if (user.isAdmin) {
    throw new APIError(400, "Cannot delete admin user");
  }
  await User.findByIdAndDelete(user._id);

  return res
    .status(200)
    .json(new APIResponse(200, null, "User deleted successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
};
