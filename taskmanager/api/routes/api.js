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
    userService.userExists(res, req.body);
});

router.post('/register-user', function (req, res, next) {
    userService.registerUser(res, req.body);
});

router.put('/save-task/:login', function (req, res, next) {
    userService.saveTask(res, req.params.login, req.body);
});

router.delete('/delete-task/:login/:taskId', function (req, res, next) {
    userService.deleteTaskById(res, req.params.login, req.params.taskId);
});

router.put('/update-task/:login', function (req, res, next) {
    userService.updateTask(res, req.params.login, req.body);
});

module.exports = router;
