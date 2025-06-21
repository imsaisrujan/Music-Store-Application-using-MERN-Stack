import express from "express";
const router = express.Router();
import { 
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateUser } from "../controllers/userController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

// All users route
router.route('/').post(registerUser).get(protect, admin, getUsers);

// User profile routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Logout and Login user routes
router.post('/logout', logoutUser);
router.post('/auth', authUser);

// Single user routes
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;