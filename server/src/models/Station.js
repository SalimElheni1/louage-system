import mongoose from 'mongoose';

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null if no admin
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Station = mongoose.model('Station', StationSchema);
export default Station;
