import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const paymentMethodSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    userName: String,
    password: String,
    email: String,
    cart: [cartItemSchema], // Add cart to user schema
    paymentMethod: paymentMethodSchema, // Add payment method
    role: {
        type: String,
        enum: ['customer', 'admin', 'superadmin'], // Enum to restrict roles to specific values
        default: 'customer', // Default role for new users
    }
}, {
    timestamps: true
});

export default mongoose.model('user', userSchema);
