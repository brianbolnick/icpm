'use strict'

var express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/test', (req, res) => {
    // Return them as json
    res.json({ test: "testing!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


// //Endpoints 
// router.get('/', function (req, res) {
//     res.json({ message: 'API Initialized!' });
// });

// router.get('/testing', function (req, res) {
//     res.json({ message: 'Test!' });
// });


// app.use('/api/v1', router);

app.listen(port, function () {
    console.log(`api running on port ${port}`);
});