import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['driver', 'passenger', 'admin', 'superadmin'],
        default: 'passenger'
    },
    station: {
        type: String,
        required: function() { return this.role === 'admin'; },
        trim: true
    },
    driverDetails: {
        vehicleType: {
            type: String,
            required: function() { return this.role === 'driver'; }
        },
        licensePlate: {
            type: String,
            required: function() { return this.role === 'driver'; }
        },
        licenseNumber: {
            type: String,
            required: function() { return this.role === 'driver'; }
        },
        experience: {
            type: String,
            required: function() { return this.role === 'driver'; }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Password verification method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
