import express from 'express';
import { getHealthStatus } from '../controllers/healthController.js';

const router = express.Router();

// Map GET /api/health to controller function
router.get('/', getHealthStatus);

export default router;