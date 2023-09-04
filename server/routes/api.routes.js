const express = require('express');
const router = express.Router();

router.use('/signup', require('../controller/auth.contoller'));
router.use('/login', require('../controller/login.controller'));
router.use('/teachers', require('../controller/teacher.controller'));

module.exports = router;