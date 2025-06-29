import User from '../models/User.js';
import { compare } from 'bcryptjs';

// @desc    Get all users (admin only)
// @route   GET /api/users/
// @access  Admin/SuperAdmin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users, message: 'Users fetched successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'User not found' });
    }
    res.json({ success: true, data: user, message: 'User fetched successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update own profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'username', 'email'];
    if (req.user.role === 'admin' || req.body.role === 'admin') {
      allowedFields.push('station');
    }
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'User not found' });
    }
    res.json({ success: true, data: user, message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Change own password
// @route   PUT /api/users/password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'User not found' });
    }
    const { currentPassword, newPassword } = req.body;
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, data: null, message: 'Current password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ success: true, data: null, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user by ID (admin only)
// @route   DELETE /api/users/:id
// @access  Admin/SuperAdmin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'User not found' });
    }
    res.json({ success: true, data: null, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (clear cookie)
// @route   POST /api/auth/logout
// @access  Private
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, data: null, message: 'Logged out successfully' });
};

export {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  deleteUser,
  logout
};
