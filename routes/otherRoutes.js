import express from 'express';

import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import {
  contact,
  getDashboardStats,
  productRequest,
} from '../controllers/otherController.js';

const router = express.Router();
// contact form

router.route('/contact').post(contact);

//request form
router.route('/productrequest').post(productRequest);

//get admin dashboard stats
router
  .route('/admin/stats')
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
