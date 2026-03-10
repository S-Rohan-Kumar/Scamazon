import { APIResponse } from "../utils/api-response.js";
import { APIError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Order } from "./../models/order.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new APIError(400, "No order items");
  }

  const neworder = await Order.create({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  return res
    .status(201)
    .json(new APIResponse(201, neworder, "Order created successfully"));
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  return res
    .status(200)
    .json(new APIResponse(200, orders, "All orders fetched successfully"));
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    throw new APIError(404, "Order not found");
  }
  return res
    .status(200)
    .json(new APIResponse(200, order, "Order fetched successfully"));
});

const getOrders  = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  return res
    .status(200)
    .json(new APIResponse(200, orders, "All orders fetched successfully"));
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new APIError(404, "Order not found");
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updaedOrder = await order.save({
    validateBeforeSave: false,
  });
  return res.status(200).json(new APIResponse(200, updaedOrder, "Order paid"));
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new APIError(404, "Order not found");
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save({
    validateBeforeSave: false,
  });
  const updatedOrder = Order.findById(order._id)
  return res.status(200).json(new APIResponse(200, updatedOrder, "Order delivered"));
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};
  