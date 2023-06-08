import express from 'express';
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateUserRole,
  updateprofilepicture,
} from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();
// To register a new user
router.route('/register').post(singleUpload, register);

//Login
router.route('/login').post(login);
//Logout
router.route('/logout').get(logout);
//Get my profile
router.route('/me').get(isAuthenticated, getMyProfile);

//Get my profile
router.route('/me').delete(isAuthenticated, deleteMyProfile);

//Change password
router.route('/changepassword').put(isAuthenticated, changePassword);

//Update profile
router.route('/updateprofile').put(isAuthenticated, updateProfile);

//Update profile picture
router
  .route('/updateprofilepicture')
  .put(isAuthenticated, singleUpload, updateprofilepicture);

//forget password
router.route('/forgetpassword').post(forgetPassword);
//reset password
router.route('/resetpassword/:token').put(resetPassword);
//addtoplaylist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);

//removefromplaylist
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);

//admin route
router.route('/admin/users').get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route('/admin/users/:id')
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
