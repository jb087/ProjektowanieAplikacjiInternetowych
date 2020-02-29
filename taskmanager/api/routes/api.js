const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbConnection = require('../db/dbConnection');

const connection = mysql.createConnection(dbConnection);

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

router.get('/', function (req, res, next) {
    connection.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected!");
    });

    res.status(200).json({
        message: "HelloWorld!"
    });
});

router.post('/check-user', function (req, res, next) {
    //TODO
    console.log(req.body);
    res.status(200).json({response: true});
});

router.post('/user-exists', function (req, res, next) {
    //TODO
    console.log(req.body);
    res.status(200).json({response: false});
});

module.exports = router;
