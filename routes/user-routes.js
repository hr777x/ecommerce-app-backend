import express from 'express';
import postUserData, { getUserById, getUserData, deleteUserById, registerUser, addToCart, addPaymentMethod } from '../controllers/user.js';

const userRoute = express.Router();

userRoute.post('/createUser', postUserData);
userRoute.get('/get', getUserData);
userRoute.get('/get/:id', getUserById);
userRoute.delete('/delete/:id', deleteUserById);
userRoute.post('/registerUser', registerUser);
userRoute.post('/addToCart', addToCart);
userRoute.post('/addPaymentMethod', addPaymentMethod);


export default userRoute;
