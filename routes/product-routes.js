import express from 'express';
import { createProduct, getProducts, getProductById, updateProductById, deleteProductById, getProductbyUser, addReview } from '../controllers/product.js';
import uploads from '../utils/helper.js';

const productRoute = express.Router();

productRoute.post('/createProduct', uploads.single('image'), createProduct);
productRoute.get('/getProducts', getProducts);
productRoute.get('/getProduct/:id', getProductById);
productRoute.put('/updateProduct/:id', updateProductById);
productRoute.delete('/deleteProduct/:id', deleteProductById);
productRoute.get('/getProductbyUser', getProductbyUser);
productRoute.post('/addReview/:productId', addReview);


export default productRoute;