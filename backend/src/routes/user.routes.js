import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/").post(registerUser).get(verifyJWT,adminAuth,getAllUsers);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT,getUserProfile).put(verifyJWT,updateUserProfile);
router.route("/:id").get(verifyJWT, adminAuth, getUserById).delete(verifyJWT, adminAuth, deleteUser);

export default router;
