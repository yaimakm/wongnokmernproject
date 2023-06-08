import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSomeProduct,
} from '../controllers/productController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();
//Delete Product,Product details
router.route('/products').get(getAllProducts);
router
  .route('/products/:id')
  .get(getSomeProduct)
  .delete(isAuthenticated, authorizeAdmin, deleteProduct);
//create new product only admin
router
  .route('/createproduct')
  .post(isAuthenticated, authorizeAdmin, singleUpload, createProduct);

//Delete Product,Product details

export default router;
