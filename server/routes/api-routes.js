const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const Todo = require('../models/Todo');
const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const Contact = require('../models/Contact');
const mongoose = require('mongoose');
const db_url = process.env.MONGODB_URI || 'mongodb://dbconfig:icpmdb1@ds013216.mlab.com:13216/icpm'
mongoose.connect(db_url);

router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!' });
});

router.get('/test', function (req, res) {
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});


// USER ROUTES
router.route('/users')
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users)
        });
    })
    .post(function (req, res) {
        const user = new User();

        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.password = req.body.password;
        // user.projects = req.body.projects;
        // user.todos = req.body.todos;
        user.team = req.body.team;
        user.avatar_url = req.body.avatar_url;
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully created' });
        });
    });


//PROJECT ROUTES
router.route('/projects')
    .get(function (req, res) {
        Project.find(function (err, projects) {
            if (err)
                res.send(err);
            res.json(projects)
        });
    })

    //post new project to the database
    .post(function (req, res) {
        req.body = JSON.parse(Object.keys(req.body)[0])
        const project = new Project();
        const project_id = project._id;

        // Update the user with the new project id
        User.findById((req.body.user_id), function (err, user) {
            if (err) { res.send(err); }
            user.projects.push(project_id);
            user.save(function (err) {
                if (err) { res.send(err); }
            });
            console.log("user updated");
        });
        project.name = req.body.name;
        project.imp_package = req.body.imp_package;
        project.csm = req.body.csm;
        project.end_date = req.body.date;
        project.status = 'active';
        project.sis = req.body.sis;
        project.auth_type = req.body.auth_type;
        project.legacy_lms = req.body.legacy_lms;
        project.support_package = req.body.support_package;
        project.user_id = req.body.user_id;

        project.save(function (err) {
            console.log("saved project");
            if (err)
                res.send(err);
            res.json(project);
        });
    });

//SINGLE PROJECT ROUTES
router.get('/projects/:project_id', function (req, res, next) {
    var project_id = req.params.project_id;
    Project.findById((project_id), function (err, project) {
        if (err) { res.send(err); }
        res.json(project);
    });
})

//USER PROJECT ROUTE
router.get('/users/:user_id/projects', function (req, res, next) {
    var user_id = req.params.user_id;
    User.findById(user_id)
        .populate('projects')
        .then(projects => {
            console.log(projects)
            res.json(projects)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
})
module.exports = router;





