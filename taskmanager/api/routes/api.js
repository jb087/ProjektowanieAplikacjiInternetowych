const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

router.post('/check-user', function (req, res, next) {
    userService.checkUser(res, req.body);
});

router.post('/user-exists', function (req, res, next) {
    //TODO
    console.log(req.body);
    res.status(200).json({response: false});
});

router.post('/register-user', function (req, res, next) {
    //TODO
    console.log(req.body);
    res.status(200).json({response: false});
});

module.exports = router;
