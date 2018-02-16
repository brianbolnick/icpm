const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const Todo = require('../models/Todo');
const Task = require('../models/Task');
const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const Contact = require('../models/Contact');
const mongoose = require('mongoose');
const db_url = process.env.MONGODB_URI || 'mongodb://dbconfig:icpmdb1@ds013216.mlab.com:13216/icpm'
mongoose.connect(db_url);

createTask = (milestone, name) => {
    const task = new Task();
    task.milestone_id = milestone;
    task.display_name = name;
    task.status = "active";

    task.save(function (err) {
        if (err)
            res.send(err);
        console.log(`created new ${name} task with id ${task._id}`);
    });
    return task._id.toString();

}

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

        const sis = new Milestone();
        const sis_task_id = sis._id;
        sis.tasks = [
            createTask(sis_task_id, "Review Documentation").toString(),
            createTask(sis_task_id, "Map Data From SIS").toString(),
            createTask(sis_task_id, "Generate CSV Files").toString(),
            createTask(sis_task_id, "Manually Import CSVs").toString(),
            createTask(sis_task_id, "Configure Automation").toString(),
            createTask(sis_task_id, "Verify Process").toString()
        ]
        sis.project_id = project.id;
        sis.save(function (err) {
            if (err)
                res.send(err);
            console.log('saved sis task', sis_task_id)
        });

        const auth = new Milestone();
        const auth_task_id = auth._id;
        auth.tasks = [
            createTask(auth_task_id, "Review Documentation").toString(),
            createTask(auth_task_id, "Configure Authentication").toString(),
            createTask(auth_task_id, "Verify Process").toString()
        ]
        auth.project_id = project.id;
        auth.save(function (err) {
            if (err)
                res.send(err);
            console.log('saved auth task', auth_task_id)
        });

        const branding = new Milestone();
        const branding_task_id = branding._id;
        branding.tasks = [
            createTask(branding_task_id, "Review Theme Editor").toString(),
            createTask(branding_task_id, "Apply Branding").toString(),
            createTask(branding_task_id, "Apply Custom CSS/JS").toString(),
            createTask(branding_task_id, "Add to Mobile Dropdown").toString()
        ]
        branding.project_id = project.id;
        branding.save(function (err) {
            if (err)
                res.send(err);
            console.log('saved branding task', branding_task_id)
        });

        const migration = new Milestone();
        const migration_task_id = migration._id;
        migration.tasks = [
            createTask(migration_task_id, "Review Process and Options").toString(),
            createTask(migration_task_id, "Create CSV Mapping File").toString(),
            createTask(migration_task_id, "Send HD to Instructure").toString(),
            createTask(migration_task_id, "Migrate Courses").toString(),
            createTask(migration_task_id, "Determine Migration Strategy").toString(),
            createTask(migration_task_id, "Verify Process").toString()
        ]
        migration.project_id = project.id;
        migration.save(function (err) {
            if (err)
                res.send(err);
            console.log('saved migration task', migration_task_id)
        });


        const other = new Milestone();
        const other_task_id = other._id;
        other.tasks = [
            createTask(other_task_id, "Setup Field Admins").toString(),
            createTask(other_task_id, "Complete Tier 1 KB Article").toString(),
            createTask(other_task_id, "Activate Support").toString(),
            createTask(other_task_id, "Register Training Users").toString(),
            createTask(other_task_id, "Review LTI/External Tools").toString(),
            createTask(other_task_id, "Setup Canvas Data").toString(),
            createTask(other_task_id, "Complete Healthcheck").toString(),
        ]
        other.project_id = project.id;
        other.save(function (err) {
            if (err)
                res.send(err);
            console.log('saved other task', other_task_id)
        });

        // Update the user with the new project id
        User.findById((req.body.user_id), function (err, user) {
            if (err) { res.send(err); }
            user.projects.push(project_id);
            user.save(function (err) {
                if (err) { res.send(err); }
            });
        });
        project.name = req.body.name;
        project.imp_package = req.body.imp_package;
        project.csm = req.body.csm;
        project.end_date = req.body.end_date;
        project.status = 'active';
        project.sis = req.body.sis;
        project.auth_type = req.body.auth_type;
        project.instance_url = req.body.instance_url;
        project.legacy_lms = req.body.legacy_lms;
        project.support_package = req.body.support_package;
        project.user_id = req.body.user_id;
        project.milestones.sis = sis_task_id;
        project.milestones.authentication = auth_task_id;
        project.milestones.branding = branding_task_id;
        project.milestones.migration = migration_task_id;
        project.milestones.other = other_task_id;

        project.save(function (err) {
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

//milestone routes
router.get('/milestones/:milestone_id', function (req, res, next) {
    var milestone_id = req.params.milestone_id;
    Milestone.findById(milestone_id)
        .populate('tasks')
        .then((err, milestone) => {
            if (err) { res.send(err); }
            res.json(milestone);
        });
})

router.put('/tasks/:task', function (req, res, next) {
    req.body = JSON.parse(Object.keys(req.body)[0])
    var task_id = req.params.task;
    var status = req.body.status;
    var milestone_id = req.body.milestone_id;
    Task.findById(task_id, function (err, task) {
        if (err) { res.send(err); }
        task.status = status;
        task.save(function (err) {
            if (err) { res.send(err); }
            Milestone.findById(milestone_id)
                .populate('tasks')
                .then((err, milestone) => {
                    if (err) { res.send(err); }
                    res.json(milestone);
                });
        });
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





