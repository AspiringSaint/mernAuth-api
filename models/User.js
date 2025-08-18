const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['superadmin', 'owner', 'manager', 'staff', 'customer'],
            default: 'customer',
        },
        active: {
            type: Boolean,
            default: true
        }
    }
)

module.exports = mongoose.model('User', userSchema);