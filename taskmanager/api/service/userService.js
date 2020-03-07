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

exports.saveTask = (res, login, requestBody) => {
    connection.query("SELECT * FROM USER WHERE UserName = ?", [login], function (err, result, fields) {
        if (err) {
            throw err;
        }

        saveTasks(result, requestBody, res);
    });
};

function saveTasks(result, requestBody, res) {
    const user = new User(result[0].ID, result[0].UserName, result[0].Password);
    const task = new Task(requestBody.id, requestBody.task, requestBody.taskContainerId, user.id);
    connection.query("INSERT INTO TASK (ID, TaskName, TaskContainerId, UserId) VALUES (?)", [[task.id, task.taskName, task.taskContainerId, task.userId]], function (err, result, fields) {
        if (err) {
            throw err;
        }

        res.status(200).json({response: true});
    });
}

exports.deleteTaskById = (res, login, taskId) => {
    connection.query("SELECT * FROM USER WHERE UserName = ?", [login], function (err, result, fields) {
        if (err) {
            throw err;
        }

        deleteTaskById(taskId, result, res);
    });
};

function deleteTaskById(taskId, result, res) {
    connection.query("DELETE FROM TASK WHERE (ID) = (?) AND (UserId) = ?", [taskId, result[0].ID], function (err, result, fieldId) {
        if (err) {
            console.log(err.sql);
            throw err;
        }

        res.status(200).json({response: true});
    })
}

exports.updateTask = (res, login, requestBody) => {
    connection.query("SELECT * FROM USER WHERE UserName = ?", [login], function (err, result, fields) {
        if (err) {
            throw err;
        }

        updateTask(res, result[0].ID, requestBody);
    });
};

function updateTask(res, userId, requestBody) {
    const task = new Task(requestBody.id, requestBody.task, requestBody.taskContainerId, userId);
    connection.query("UPDATE TASK SET TaskName = ?, TaskContainerId = ? WHERE ID = ? AND UserId = ?",
        [task.taskName, task.taskContainerId, task.id, task.userId], function (err, result, fields) {
            if (err) {
                throw err;
            }

            res.status(200).json({response: true});
        });
}

exports.getTasks = (res, login) => {
    connection.query("SELECT * FROM USER WHERE UserName = ?", [login], function (err, result, fields) {
        if (err) {
            throw err;
        }

        getTasks(res, result[0].ID);
    });
};

function getTasks(res, userId) {
    connection.query("SELECT * FROM TASK WHERE UserId = ?", [userId], function (err, result, fields) {
        if (err) {
            throw err;
        }

        const tasks = result.map(task => Task.viewTask(task.ID, task.TaskName, task.TaskContainerId, task.UserId));
        res.status(200).json({response: tasks});
    });
}
