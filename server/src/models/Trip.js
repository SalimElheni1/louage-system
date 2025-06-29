import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    departureStation: { type: String, required: true },
    arrivalStation: { type: String, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Trip = mongoose.model('Trip', TripSchema);
export default Trip;
