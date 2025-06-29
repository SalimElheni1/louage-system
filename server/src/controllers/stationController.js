import Station from '../models/Station.js';

// @desc    Create a new station
// @route   POST /api/stations
// @access  Admin/Superadmin
const createStation = async (req, res) => {
  try {
    const { name, admin, destinations } = req.body;
    const existing = await Station.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: 'Station already exists' });
    }
    const station = new Station({ name, admin: admin || null, destinations: destinations || [] });
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all stations
// @route   GET /api/stations
// @access  Public
const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().populate('admin', '-password').populate('destinations', 'name');
    res.json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get station by ID
// @route   GET /api/stations/:id
// @access  Public
const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate('admin', '-password').populate('destinations', 'name');
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update station
// @route   PUT /api/stations/:id
// @access  Admin/Superadmin
const updateStation = async (req, res) => {
  try {
    const { name, admin, destinations } = req.body;
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    if (name !== undefined) station.name = name;
    if (admin !== undefined) station.admin = admin;
    if (destinations !== undefined) station.destinations = destinations;
    await station.save();
    res.json(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete station
// @route   DELETE /api/stations/:id
// @access  Admin/Superadmin
const deleteStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    await station.deleteOne();
    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation
};
