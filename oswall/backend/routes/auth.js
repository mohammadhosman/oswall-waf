const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');

//Registration route
router.post('/register', async (req, res) => {
    const {email, username, password, name, address} = req.body;
    try {
        // Check if user with given email already exists
        let user = await User.findOne({email});
        // Case where user with given email already exists. Return 400 error
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }
        // Check if user with given username already exists
        user = await User.findOne({username});
        // Case where user with given username already exists. Return 400 error
        if (user) {
            return res.status(400).json({message: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            name,
            address
        });

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error){
        console.error('User registration error.', error);
        res.status(500).json({message: '500 Server error'});
    }
});

// Login route
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {

        // Check if user with given email exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                address: user.address
            }
        });
    } catch (error){
        console.error('User login error from login route.', error);
        res.status(500).json({message: '500 Server error'});
    }
})

router.get('/profile', auth, async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile. From routes/auth.js profile route: ', error);
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;