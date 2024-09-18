import User from '../models/user-model.js';
import Product from '../models/product-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

export const postUserData = async (req,res) =>{
    try {
        const {name, userName, password, email, cardNumber, expiryDate, cvv} = req.body;
        console.log(req.body);
        const isEmailExisting = await User.findOne({email : email});
        if(isEmailExisting){
            return res.status(400).json({message: "Email already exists"});
        }
        const userData = new User({
            name,
            userName,
            password,
            email,
            cardNumber,
            expiryDate,
            cvv
        })

        await userData.save()
        return res.status(200).json({message: 'data saved successfully!',success : true , userData})
    } 
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserData = async (req,res) => {
    try {
        const getUsers = await User.find()
        return res.status(200).json({success:true, getUsers});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getUserById = async (req, res) =>{
    try {
        const getuserId = req.params.id;
        const userData = await User.findById(getuserId);
        if(!userData){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({success: true, userData});
    } catch (error) {
        res.status(500).json(500).json({message: error.message})
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ success: true, message: 'User deleted successfully', deletedUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const userdata = req.body;
        let isEmailExisting = await User.findOne({ email: userdata.email });
        if(isEmailExisting){
            return res.status(400).json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(userdata.password, 10);
        userdata.password = hashedPassword;
        const user = await User.create(userdata);

        return res.status(200).json({message: 'data saved successfully!',success : true , userdata})
    } catch (error) {   
        return res.status(500).json({ message: error.message });
    }
}
export default postUserData;


export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if quantity is valid
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        // Find user and product
        const user = await User.findById(userId);
        const product = await Product.findById(productId);
        
        if (!user || !product) {
            return res.status(404).json({ message: 'User or Product not found' });
        }

        // Check if product is already in cart
        const existingCartItem = user.cart.find(item => item.product.toString() === productId);

        if (existingCartItem) {
            // Update the quantity if product is already in the cart
            existingCartItem.quantity += quantity;
        } else {
            // Add new item to the cart
            const cartItem = {
                product: productId,
                quantity
            };
            user.cart.push(cartItem);
        }

        // Save the user with updated cart
        await user.save();

        return res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const addPaymentMethod = async (req, res) => {
    try {
        const { userId, cardNumber, expiryDate, cvv } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.paymentMethod = { cardNumber, expiryDate, cvv };
        await user.save();

        return res.status(200).json({ message: 'Payment method added successfully', user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const userdata = req.body;
        const user = await User.findOne({ email: userdata.email });
        if(!user)
            {
                return res.status(404).json({message: "Invalid Email or Password"});
            }
            const isValidPassword = await bcrypt.compare(userdata.password, user.password);
            if(!isValidPassword){
                return res.status(400).json({message: "Password is incorrect"});
            }

            const jwttoken = await jwt.sign({id: user.id, role: user.role}, process.env.PRIVATE_KEY, {expiresIn: "1h"});
            res.cookie("jwt", jwttoken, {httpOnly: true, secure: true, maxAge: 5*60});
            return res.status(200).json({message: "Login Successful", token: jwttoken,  user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                role: user.role
            }});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
try {
    res.clearCookie("jwt");
    return res.status(200).json({message: "Logout Successful"});
} catch (error) {
    return res.status(500).json({ message: error.message });
}

};


