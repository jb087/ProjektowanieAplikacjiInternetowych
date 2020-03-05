const uuid = require('uuid');

const User = require('../entity/User');
const Task = require('../entity/Task');

const mysql = require('mysql');
const dbConnection = require('../db/dbConnection');
const connection = mysql.createConnection(dbConnection);

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
});


exports.checkUser = (res, requestBody) => {
    const user = User.withoutId(requestBody.login, requestBody.password);
    connection.query("SELECT COUNT(*) AS userCount FROM USER WHERE UserName = ? AND Password = ?", [user.login, user.password],
        function (err, result, fields) {
        if (err) {
            throw err;
        }

        const isCorrectData = parseInt(result[0].userCount) === 1;
        res.status(200).json({response: isCorrectData});
    });
};

exports.userExists = (res, requestBody) => {
    const user = User.withoutId(requestBody.login, requestBody.password);
    connection.query("SELECT COUNT(*) AS userCount FROM USER WHERE UserName = ?", [user.login],
        function (err, result, fields) {
            if (err) {
                throw err;
            }

            const userExists = parseInt(result[0].userCount) > 0;
            res.status(200).json({response: userExists});
        });
};

exports.registerUser = (res, requestBody) => {
    const id = uuid.v1();
    const user = new User(id, requestBody.login, requestBody.password);
    connection.query("INSERT INTO USER (ID, UserName, Password) VALUES (?)", [[user.id, user.login, user.password]],
        function (err, result, fields) {
            if (err) {
                throw err;
            }

            res.status(200).json({response: true});
        });
};

exports.saveTasks = (res, login, requestBody) => {
    const user = getUserByLogin(login);
    const tasks = requestBody.map(task => new Task(task.id, task.task, task.taskContainerId, user.id));
    console.log(tasks);

    //TODO Save tasks and getUserByLogin must wait
    //TODO jak task już jest na bazie, to go nie dodawać
    //TODO zwrocić message

    res.status(200).json({response: true});
};

async function getUserByLogin(login) {
    let user = null;
    await connection.query("SELECT * FROM USER WHERE UserName = ?", [login], function (err, result, fields) {
        if (err) {
            throw err;
        }

        user = new User(result[0].ID, result[0].UserName, result[0].Password);
    });
    return user;
}
