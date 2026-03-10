import { APIResponse } from "../utils/api-response.js";
import { APIError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Product } from "../models/product.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloundnary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: "i",
    },
  } : {}
  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
  return res
    .status(200)
    .json(new APIResponse(200, {products , page , pages : Math.ceil(count / pageSize)}, "All products fetched successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new APIError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new APIResponse(200, product, "Product fetched successfully"));
});

const createproduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    user: req.user._id,
    name: "Sample name",
    image: "/images/p1.jpg",
    description: "Sample description",
    brand: "Sample brand",
    category: "Sample category",
    price: 0,
    countInStock: 10,
  });

  return res
    .status(201)
    .json(new APIResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new APIError(400, "Invalid Product ID format");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new APIError(404, "Product not found");
  }

  const { name, image, description, brand, category, price, countInStock } =
    req.body;

  let prodImage;

  const prodlocaPath = req.file?.path;

  if (prodlocaPath) {
    try {
      prodImage = await uploadOnCloudinary(prodlocaPath);
    } catch (error) {
      console.log("Error uploading avatar", error);
      throw new APIError(500, "Error uploading image to Cloudinary");
    }
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.price = Number(price) || product.price;
  product.countInStock = Number(countInStock) ?? product.countInStock;
  product.image =
    prodImage?.url ||
    (image && !image.startsWith("blob:") ? image : product.image);

  await product.save({
    validateBeforeSave: false,
  });

  const updatedProduct = await Product.findById(product._id);

  return res
    .status(200)
    .json(new APIResponse(200, updatedProduct, "Product updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new APIError(404, "Product not found");
  }

  await Product.findByIdAndDelete(product._id);

  return res
    .status(200)
    .json(new APIResponse(200, null, "Product deleted successfully"));
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new APIError(404, "Product not found");
  }
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString(),
  );
  if (alreadyReviewed) {
    throw new APIError(400, "Product already reviewed");
  }
  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({
    validateBeforeSave: false,
  });
  const updatedProduct = await Product.findById(product._id);
  return res
    .status(201)
    .json(
      new APIResponse(201, updatedProduct, "Product reviewed successfully"),
    );
});

export {
  getAllProducts,
  getProductById,
  createproduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
