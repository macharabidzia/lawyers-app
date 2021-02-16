import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getLawyerList,
  getTopLawyers,
  createLawyerReview,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin, isLawyer } from '../middleware/userTypeMiddleware.js';

const router = express.Router();
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/lawyers').get(getLawyerList);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);
router.route('/lawyers/:id/reviews').post(protect, createLawyerReview);
router.get('/lawyers/top', getTopLawyers);

export default router;
