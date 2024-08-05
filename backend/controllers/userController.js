import generateToken from "../middlewares/generateToken.js";
import TryCatch from "../middlewares/TryCatch.js";
import { User } from "../model/userModel.js";
import bcrypt from 'bcrypt';

// register
export const register = async(req,res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })
        if(user) return res.status(400).json({message: "Already have an account with this email"});

        const hashPassword = await bcrypt.hash(password, 10)

        // update user
        user = await User.create({
            name, email, password: hashPassword,
        });
        generateToken(user._id, res);
        
        res.status(201).json({user, message: "User Registered"})
    } catch (error) {
        res.status(500).json({message: "Invaild server error"})
    }
}

// login
export const login = TryCatch (async(req, res) => {
    const {email , password} = req.body;

    let user = await User.findOne({email})
    if(!user) return res.status(400).json({message : "No user with this email"});

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) return res.status(400).json({message: "Wrong Password"});

    generateToken(user._id, res);
    res.status(200).json({user, message: "Login Succesfully"});
});

// myProfile
export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json({ user });
  });