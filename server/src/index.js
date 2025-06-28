import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Mount the health check routes at /api/health. 
// This allows external services or monitoring tools to check if the API is running and healthy.
app.use('/api/health', healthRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Digital Louage System API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});