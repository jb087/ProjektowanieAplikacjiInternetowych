const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbConnection = require('../db/dbConnection');

const connection = mysql.createConnection(dbConnection);

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

module.exports = router;
