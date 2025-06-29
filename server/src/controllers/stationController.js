import Station from '../models/Station.js';

// @desc    Create a new station
// @route   POST /api/stations
// @access  Admin/Superadmin
const createStation = async (req, res, next) => {
  try {
    const { name, admin, destinations } = req.body;
    const existing = await Station.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, data: null, message: 'Station already exists' });
    }
    const station = new Station({ name, admin: admin || null, destinations: destinations || [] });
    await station.save();
    res.status(201).json({ success: true, data: station, message: 'Station created successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all stations
// @route   GET /api/stations
// @access  Public
const getAllStations = async (req, res, next) => {
  try {
    const stations = await Station.find().populate('admin', '-password').populate('destinations', 'name');
    res.json({ success: true, data: stations, message: 'Stations fetched successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get station by ID
// @route   GET /api/stations/:id
// @access  Public
const getStationById = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id).populate('admin', '-password').populate('destinations', 'name');
    if (!station) {
      return res.status(404).json({ success: false, data: null, message: 'Station not found' });
    }
    res.json({ success: true, data: station, message: 'Station fetched successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update station
// @route   PUT /api/stations/:id
// @access  Admin/Superadmin
const updateStation = async (req, res, next) => {
  try {
    const { name, admin, destinations } = req.body;
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, data: null, message: 'Station not found' });
    }
    if (name !== undefined) station.name = name;
    if (admin !== undefined) station.admin = admin;
    if (destinations !== undefined) station.destinations = destinations;
    await station.save();
    res.json({ success: true, data: station, message: 'Station updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete station
// @route   DELETE /api/stations/:id
// @access  Admin/Superadmin
const deleteStation = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, data: null, message: 'Station not found' });
    }
    await station.deleteOne();
    res.json({ success: true, data: null, message: 'Station deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation
};
