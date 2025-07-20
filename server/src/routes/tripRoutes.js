import express from 'express';
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getMyTrips
} from '../controllers/tripController.js';
import auth from '../middleware/auth.js';
import { check } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', getAllTrips);

// Get trips for the logged-in user (driver)
// This must come before the /:id route to avoid "my-trips" being treated as an ID
router.get('/my-trips', auth, getMyTrips);

router.get('/:id', getTripById);
// Protected routes
router.post('/', [
    auth,
    check('departureStation', 'Departure station is required').not().isEmpty(),
    check('arrivalStation', 'Arrival station is required').not().isEmpty(),
    check('departureTime', 'A valid departure time is required').isISO8601().toDate(),
    check('availableSeats', 'Available seats must be a number greater than 0').isInt({ gt: 0 }),
    check('price', 'Price must be a positive number').isFloat({ gt: 0 }),
],
createTrip
);

router.put('/:id', auth, updateTrip);
router.delete('/:id', auth, deleteTrip);

export default router;
