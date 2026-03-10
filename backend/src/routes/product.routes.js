import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createproduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/product.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.midleware.js";


const router = Router();

router.route("/").get(getAllProducts).post(verifyJWT, adminAuth, createproduct);

router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(verifyJWT, adminAuth, upload.single("prodImage")  , updateProduct)
  .delete(verifyJWT, adminAuth, deleteProduct);

router
  .route("/:id/reviews")
  .post(verifyJWT, createProductReview);

  
  

export default router;
