import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 0
    },
    image: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true  // adds created_at and updated_at timestamps
});

export default mongoose.model('Product', productSchema);
