import express from 'express';
import {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation
} from '../controllers/stationController.js';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorize.js';

const router = express.Router();

// Public routes
router.get('/', getAllStations);
router.get('/:id', getStationById);

// Protected routes (admin/superadmin only)
router.post('/', auth, authorizeRoles('admin', 'superadmin'), createStation);
router.put('/:id', auth, authorizeRoles('admin', 'superadmin'), updateStation);
router.delete('/:id', auth, authorizeRoles('admin', 'superadmin'), deleteStation);

export default router;
