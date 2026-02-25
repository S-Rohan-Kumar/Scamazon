import {APIResponse} from "../utils/api-response.js"
import {APIError} from "../utils/api-error.js"
import {asyncHandler} from "../utils/async-handler.js"
import {Product} from "../models/product.models.js"

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    return res
        .status(200)
        .json(new APIResponse(200,products , "All products fetched successfully"))
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new APIError(404, "Product not found")
    }
    return res
        .status(200)
        .json(new APIResponse(200,product , "Product fetched successfully"))
})

export {getAllProducts,getProductById}