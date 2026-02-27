import {APIResponse} from "../utils/api-response.js"
import {APIError} from "../utils/api-error.js"
import {asyncHandler} from "../utils/async-handler.js"


export const adminAuth = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new APIError(401,"Not authorized as an admin");
    }
})