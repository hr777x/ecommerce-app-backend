import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"]
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        Enum: ["customer", "admin", "superadmin"],
        default: "customer"
    }
},
{
    timestamps:true
}
);

const user = mongoose.model("user", userSchema);

export default user;