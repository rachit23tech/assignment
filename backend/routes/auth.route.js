import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }   
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;   
    try {
        const user = await User.findOne({ email });     
        if (!user) {    
        return res.status(400).json({ message: "Invalid credentials" });
        }   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }   
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;