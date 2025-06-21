import express from 'express';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();
import { 
  getProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

// All products route
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// Top products route
router.get('/top', getTopProducts);

// Single product route
router.route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

// Product reviews route
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;