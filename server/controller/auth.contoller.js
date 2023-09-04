const express = require('express');
const router = express.Router();
const httpStatusCodes = require('http-status-codes');

const Auth = require('../models/auth.model');

// Get users
router.get('/', async (req, res) => {
    try {
        const users = await Auth.find();

        // Check for user
        if(users.length === 0) {
            return res.status(httpStatusCodes.NO_CONTENT).json({
                message: 'No users found'
            });
        };

        res.status(httpStatusCodes.OK).json(users);
    } catch(err) {
        console.log('Error while getting users');
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Create account
router.post('/', async(req, res) => {
    obj = req.body;

    try {
        if(!obj.username || !obj.name || !obj.contact || !obj.email || !obj.password) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: 'Please enter all required details'
            });
        };

        // check for existing phone number
        const existingPh = await Auth.findOne({
            contact: obj.contact
        });
        if(existingPh) {
            return res.status(httpStatusCodes.CONFLICT).json({
                error: 'User with this phone number already exists',
                message: 'Phone number already exist'
            });
        };

        const createUser = await Auth.create(obj);
        res.status(httpStatusCodes.OK).json(createUser);
    } catch(err) {
        console.log('Error while creating account: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Get user by id
router.get('/:id', async(req, res) => {
    let id = req.params.id;
    try {
        const userId = await Auth.findById(id);

        if(!userId) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                error: 'User with this id not exists',
                message: 'User with this id not exists'
            });
        };

        res.status(httpStatusCodes.OK).json(userId);
    } catch(err) {
        console.log('Error while getting user by id: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Update user
router.put('/:id', async(req, res) => {
    obj = req.body;
    let id = req.params.id;

    try {
        const userId = await Auth.findById(id);
        if(!userId) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                error: 'User with id not exists',
                message: 'User not found with this id'
            });
        };

        const updateUser = await Auth.findByIdAndUpdate(id, {
            username: obj.username,
            name: obj.name,
            contact: obj.contact,
            email: obj.email,
            password: obj.password
        });
        res.status(httpStatusCodes.OK).json(updateUser);
    } catch(err) {
        console.log('Error while updating user: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Delete account
router.delete('/:id', async(req, res) => {
    let id = req.params.id;
    try {
        const userId = await Auth.findById(id);
        if(!userId) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                error: 'User not found for this id',
                message: 'User with this id not exists'
            });
        };

        const deleteAcc = await Auth.findByIdAndDelete(id);
        res.status(httpStatusCodes.OK).json(deleteAcc);
    } catch(err) {
        console.log('Error while deleting account: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

module.exports = router;