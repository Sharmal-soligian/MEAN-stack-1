const express = require('express');
const router = express.Router();
const httpStatusCodes = require('http-status-codes');

const Teacher = require('../models/teachers.model');

// Get teachers
router.get('/', async(req, res) => {
    try {
        const teachers = await Teacher.find();
        if(teachers.length === 0) {
            return res.status(httpStatusCodes.NO_CONTENT).json({
                message: 'No teachers found'
            });
        };
        res.status(httpStatusCodes.OK).json(teachers);
    } catch(err) {
        console.error('Error while getting teachers: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// create teachers
router.post('/', async(req, res) => {
    obj = req.body;
    try {
        if(!obj.name || !obj.experience) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: 'Name and experience is required'
            });
        };

        const createTeacher = await Teacher.create(obj);
        res.status(httpStatusCodes.OK).json(createTeacher);
    } catch(err) {
        console.error('Error while creating user: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// get teacher by id
router.get('/:id', async(req, res) => {
    let id = req.params.id;

    try {
        const teacherId = await Teacher.findById(id);
        if(!teacherId) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                message: 'No teacher with this id exists'
            });
        };

        res.status(httpStatusCodes.OK).json(teacherId);
    } catch(err) {
        console.log('Error while getting teacher by id ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Update teacher
router.put('/:id', async(req, res) => {
    obj = req.body;
    let id = req.params.id;

    try {
        const teacherId = await Teacher.findById(id);
        if(!teacherId) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                error: 'Teacher with this id not found',
                message: 'No teacher with this id'
            });
        };

        const updateUser = await Teacher.findByIdAndUpdate(id, {
            name: obj.name,
            experience: obj.experience,
            previousEmployer: obj.previousEmployer
        });
        res.status(httpStatusCodes.OK).json(updateUser);
    } catch(err) {
        console.error('Error while updating teacher: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Delete teacher
router.delete('/:id', async(req, res) => {
    let id = req.params.id;

    try {
        const teacherId = await Teacher.findById(id);
        if(!teacherId) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                error: 'Teacher with this id not found',
                message: 'No teacher with this id'
            });
        };

        const deleteTeacher = await Teacher.findByIdAndDelete(id);
        res.status(httpStatusCodes.OK).json(deleteTeacher)
    } catch(err) {
        console.error('Error while deleting teachers: ' + err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

module.exports = router;