import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
    check('role', 'Role is required and must be either passenger or driver').isIn(['passenger', 'driver']),
    // Conditionally validate driver-specific fields
    check('vehicleType').if(check('role').equals('driver')).not().isEmpty().withMessage('Vehicle type is required for drivers'),
    check('licensePlate').if(check('role').equals('driver')).not().isEmpty().withMessage('License plate is required for drivers'),
    check('licenseNumber').if(check('role').equals('driver')).not().isEmpty().withMessage('Driver\'s license number is required for drivers'),
    check('experience').if(check('role').equals('driver')).not().isEmpty().withMessage('Years of experience is required for drivers')
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, logout);

export default router;