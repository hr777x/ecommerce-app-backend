import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],  // List of products from the cart
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        cardNumber: String,
        expiryDate: String,
        cvv: String
    },
    shippingAddress: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    contactInfo: {
        phone: String,
        email: String
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);