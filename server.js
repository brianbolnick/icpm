'use strict'

var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Require data models here
// example: var User = require('./model/users');

var app = express();
var router = express.Router();

// Add database configuration here
const db_url = process.env.MONGODB_URI || 'mongodb://dbconfig:icpmdb1@ds013216.mlab.com:13216/icpm'

mongoose.connect(db_url);
var User = require('./server/models/User');
var Todo = require('./server/models/Todo');
var Project = require('./server/models/Project');
var Milestone = require('./server/models/Milestone');
var Contact = require('./server/models/Contact');



// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var port = process.env.PORT || 5000;

// Enable body parser to read incoming POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow CORS requests - customize this to restrict it to certain origins
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });


//Endpoints go here
router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!' });
});

router.get('/test', function (req, res) {
    res.json({ message: 'Test!' });
});


// USER ROUTES
router.route('/users')
    //retrieve all comments from the database
    .get(function (req, res) {
        //looks at our Comment Schema
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users)
        });
    })
    //post new comment to the database
    .post(function (req, res) {
        var user = new User();
        //body parser lets us use the req.body
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
    //retrieve all comments from the database
    .get(function (req, res) {
        Project.find(function (err, projects) {
            if (err)
                res.send(err);
            res.json(projects)
        });
    })

    //post new project to the database
    .post(function (req, res) {
        var project = new Project();
        var project_id = project._id;

        // Update the user with the new project id
        User.findById((req.body.user_id), function (err, user) {
            if (err) { res.send(err); }
            user.projects.push(project_id);
            user.save(function (err) {
                if (err) { res.send(err); }
                console.log("user updated");
            });
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
            if (err)
                res.send(err);
            res.json({ 
                message: 'Project successfully created',
                id: project_id,
                user_id: req.body.user_id
         });
        });
    });


//If no route matches, send the client 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//all api requests will fall under /api
app.use('/api', router);

app.listen(port, function () {
    console.log(`api running on port ${port}`);
    console.log(process.env.REACT_APP_SECRET_CODE);
});