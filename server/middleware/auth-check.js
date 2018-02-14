const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
        if (!req.headers.authorization) {
        console.log("no auth header", req.headers);
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    // get the last part from an authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status        
        if (err) {
            console.log("bad token", err);

            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const userId = decoded.sub;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                console.log("no user found", req.headers);

                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            return next();
        });
    });
};