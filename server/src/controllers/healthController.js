import mongoose from 'mongoose';

/**
 * Health check controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getHealthStatus = (req, res) => {
  try {
    // Get database connection status
    const dbStatus = mongoose.connection.readyState;
    
    // Map status codes to human-readable values
    const statusMap = {
      0: 'DISCONNECTED',
      1: 'CONNECTED',
      2: 'CONNECTING',
      3: 'DISCONNECTING'
    };
    
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: statusMap[dbStatus] || 'UNKNOWN',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'DOWN',
      error: error.message 
    });
  }
};