const express = require('express');
const User = require('../models/User');
const Todo = require('../models/Todo');
const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const Contact = require('../models/Contact');
const mongoose = require('mongoose');
const db_url = process.env.MONGODB_URI || 'mongodb://dbconfig:icpmdb1@ds013216.mlab.com:13216/icpm'
mongoose.connect(db_url);
// const validator = require('validator');

const router = new express.Router();

router.post('/signup', (req, res) => {
    // if (!validationResult.success) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "something went wrong",
    //         data: req.body
    //     });
    // }
    console.log("in controller");
    console.log("body", req.body);
    return res.status(200).json({
        message: 'Sign up successful',
        data: req.body
    });
});

router.post('/login', (req, res) => {
    // if (!validationResult.success) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "something went wrong",
    //         data: req.body
    //     });
    // }

    return res.status(200).json({
        message: 'Sign up successful',
        data: req.body
    });
});


module.exports = router;