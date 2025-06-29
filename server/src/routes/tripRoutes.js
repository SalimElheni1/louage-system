import express from 'express';
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from '../controllers/tripController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllTrips);
router.get('/:id', getTripById);

// Protected routes
router.post('/', auth, createTrip);
router.put('/:id', auth, updateTrip);
router.delete('/:id', auth, deleteTrip);

export default router;
