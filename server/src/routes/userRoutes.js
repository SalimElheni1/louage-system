import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  deleteUser,
  logout
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/authorize.js';

const router = Router();

// Admin: Get all users
router.get('/', auth, authorizeRoles('admin', 'superadmin'), getAllUsers);

// Admin: Get user by ID
router.get('/:id', auth, authorizeRoles('admin', 'superadmin'), getUserById);

// Private: Update own profile
router.put('/profile', auth, updateProfile);

// Private: Change own password
router.put('/password', auth, changePassword);

// Admin: Delete user by ID
router.delete('/:id', auth, authorizeRoles('admin', 'superadmin'), deleteUser);

// Private: Logout
router.post('/logout', auth, logout);

export default router;
