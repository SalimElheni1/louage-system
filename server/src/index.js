import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',');
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

// Mount the health check routes at /api/health. 
// This allows external services or monitoring tools to check if the API is running and healthy.
app.use('/api/health', healthRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stations', stationRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Digital Louage System API is running!');
});

// Global error handler (should be after all routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});