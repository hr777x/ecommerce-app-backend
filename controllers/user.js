import user from '../models/user-model.js';
import bcrypt from 'bcryptjs';

export const postUserData = async (req,res) =>{
    try {
        const {name, userName, password, email} = req.body;
        console.log(req.body);
        const isEmailExisting = await user.findOne({email : email});
        if(isEmailExisting){
            return res.status(400).json({message: "Email already exists"});
        }
        const userData = new user({
            name,
            userName,
            password,
            email
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
        const getUsers = await user.find()
        return res.status(200).json({success:true, getUsers});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getUserById = async (req, res) =>{
    try {
        const getuserId = req.params.id;
        const userData = await user.findById(getuserId);
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
        const deletedUser = await user.findByIdAndDelete(userId);
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
        let isEmailExisting = await user.findOne({ email: userdata.email });
        if(isEmailExisting){
            return res.status(400).json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(userdata.password, 10);
        userdata.password = hashedPassword;
        const User = await user.create(userdata);

        return res.status(200).json({message: 'data saved successfully!',success : true , userdata})
    } catch (error) {   
        return res.status(500).json({ message: error.message });
    }
}
export default postUserData;