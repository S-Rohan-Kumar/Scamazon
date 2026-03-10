import {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/admin.middleware.js";
import { Router } from 'express';

const router = Router();


router.route("/").post(verifyJWT, createOrder).get(verifyJWT, adminAuth, getOrders);
router.route("/me").get(verifyJWT, getMyOrders);
router.route("/:id").get(verifyJWT , getOrderById);
router.route("/:id/pay").put(verifyJWT , updateOrderToPaid);
router.route("/:id/deliver").put(verifyJWT , adminAuth , updateOrderToDelivered);

export default router;