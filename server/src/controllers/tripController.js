import Trip from '../models/Trip.js';
import User from '../models/User.js';

const stationsWithoutAdmin = ['Kebili']; // Example, can be expanded later

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Driver/Admin/Superadmin
const createTrip = async (req, res, next) => {
  try {
    const { departureStation, arrivalStation, availableSeats, price, driver } = req.body;
    let assignedDriver = driver || req.user.id;

    if (req.user.role === 'driver') {
      // Drivers: only from stations without admin
      if (!stationsWithoutAdmin.includes(departureStation)) {
        return res.status(403).json({ success: false, data: null, message: 'Drivers can only create trips from stations without administration (e.g., Kebili)' });
      }
      assignedDriver = req.user.id;
    } else if (req.user.role === 'admin') {
      // Admins: only for their own station
      if (!req.user.station || req.user.station !== departureStation) {
        return res.status(403).json({ success: false, data: null, message: 'Admins can only create trips for their own station' });
      }
      if (!assignedDriver) {
        return res.status(400).json({ success: false, data: null, message: 'Admin must assign a driver for the trip' });
      }
    } else if (req.user.role === 'superadmin') {
      // Superadmin: can create for any station, must assign driver
      if (!assignedDriver) {
        return res.status(400).json({ success: false, data: null, message: 'Superadmin must assign a driver for the trip' });
      }
    } else {
      return res.status(403).json({ success: false, data: null, message: 'Not authorized to create trips' });
    }

    const trip = new Trip({
      driver: assignedDriver,
      departureStation,
      arrivalStation,
      availableSeats,
      price,
      createdBy: req.user.id
    });
    await trip.save();
    res.status(201).json({ success: true, data: trip, message: 'Trip created successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trips (public)
// @route   GET /api/trips
// @access  Public
const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate('createdBy', 'driver', '-password');
    res.json({ success: true, data: trips, message: 'Trips fetched successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trip by ID (public)
// @route   GET /api/trips/:id
// @access  Public
const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('driver', '-password');
    if (!trip) {
      return res.status(404).json({ success: false, data: null, message: 'Trip not found' });
    }
    res.json({ success: true, data: trip, message: 'Trip fetched successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip (driver or admin)
// @route   PUT /api/trips/:id
// @access  Driver/Admin
const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, data: null, message: 'Trip not found' });
    }
    if (req.user.role === 'superadmin') {
      // proceed
    } else if (req.user.role === 'admin') {
      if (!req.user.station || trip.departureStation !== req.user.station) {
        return res.status(403).json({ success: false, data: null, message: 'Admins can only update trips from their own station' });
      }
    } else if (req.user.role === 'driver') {
      if (
        trip.createdBy.toString() !== req.user.id ||
        trip.status !== 'active' ||
        !stationsWithoutAdmin.includes(trip.departureStation)
      ) {
        return res.status(403).json({ success: false, data: null, message: 'Drivers can only update their own active trips from stations without administration' });
      }
    } else {
      return res.status(403).json({ success: false, data: null, message: 'Not authorized to update this trip' });
    }
    const allowedFields = ['departureStation', 'arrivalStation', 'availableSeats', 'price', 'status'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        trip[field] = req.body[field];
      }
    }
    await trip.save();
    res.json({ success: true, data: trip, message: 'Trip updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip (driver or admin)
// @route   DELETE /api/trips/:id
// @access  Driver/Admin
const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, data: null, message: 'Trip not found' });
    }
    if (req.user.role === 'superadmin') {
      // proceed
    } else if (req.user.role === 'admin') {
      if (!req.user.station || trip.departureStation !== req.user.station) {
        return res.status(403).json({ success: false, data: null, message: 'Admins can only delete trips from their own station' });
      }
    } else if (req.user.role === 'driver') {
      if (
        trip.createdBy.toString() !== req.user.id ||
        trip.status !== 'active' ||
        !stationsWithoutAdmin.includes(trip.departureStation)
      ) {
        return res.status(403).json({ success: false, data: null, message: 'Drivers can only delete their own active trips from stations without administration' });
      }
    } else {
      return res.status(403).json({ success: false, data: null, message: 'Not authorized to delete this trip' });
    }
    await trip.deleteOne();
    res.json({ success: true, data: null, message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip
};
