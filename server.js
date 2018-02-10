'use strict'

var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var port = process.env.PORT || 5000;

// Enable body parser to read incoming POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS stuff
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Routes
const authRoutes = require('./server/routes/auth-routes');
app.use('/auth', authRoutes);

const apiRoutes = require('./server/routes/api-routes');
app.use('/api', apiRoutes);


//If no route matches, send the client 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, function () {
    console.log(`server running on port ${port}`);
    console.log(process.env.REACT_APP_SECRET_CODE);
});