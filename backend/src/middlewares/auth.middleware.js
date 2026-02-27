import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { APIError } from "../utils/api-error.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.jwt ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    "";

  if (!token) {
    throw new APIError(401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?.userId).select("-password");

    if (!user) {
      throw new APIError(401, "User not authorized and not allowed ");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new APIError(401, error?.message || "Invalid Access token");
  }
});
