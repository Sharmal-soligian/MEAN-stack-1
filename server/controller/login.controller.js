const express = require('express');
const router = express.Router();
const httpStatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken'); 

const Auth = require('../models/auth.model');

// Login route
router.post('/', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Auth.findOne({ email });
        if(!user) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                error: 'Invalid credentials',
                message: 'User not found'
            });
        }

        // Check for password
        if(user.password !== password) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                error: 'Invalid credentials',
                message: 'Incorrect password'
            });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        res.status(httpStatusCodes.OK).json({
            message: 'Login Successful',
            token
        });
    } catch(err) {
        console.log('Error while logging in: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

module.exports = router;
