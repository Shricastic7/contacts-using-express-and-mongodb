const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const ValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            next(); // Call next to proceed to the next middleware or route handler
        } catch (err) {
            res.status(401);
            return next(new Error('User is not authorized'));
        }
    } else {
        res.status(401);
        return next(new Error('Authorization header is missing or malformed'));
    }
});

module.exports = ValidateToken;
