import Product from '../models/product-model.js';

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, quantity, price, image, user } = req.body;
        const product = new Product({ name, quantity, price, image, user: user });
        await product.save();
        return res.status(201).json({ message: 'Product created successfully!', success: true, product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ success: true, products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
export const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product updated successfully!', updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product deleted successfully!', deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProductbyUser = async (req, res) => {

    try {
        const product = await Product.find().populate('user');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product retrieved successfully!', product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment, user } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = {
            user,
            rating,
            comment
        };

        product.reviews.push(review);
        await product.save();

        return res.status(200).json({ message: 'Review added successfully', product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
