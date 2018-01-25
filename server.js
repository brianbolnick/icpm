'use strict'

var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

// Add database configuration here

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var port = process.env.PORT || 5000;

// Enable body parser to read incoming POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow CORS requests - customize this to restrict it to certain origins
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//Endpoints go here
router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!' });
});

router.get('/test', function (req, res) {
    res.json({ message: 'Test!' });
});

        
//If no route matches, send the client 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//all api requests will fall under /api
app.use('/api', router);

app.listen(port, function () {
    console.log(`api running on port ${port}`);
});