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
    connection.query("SELECT * FROM USER WHERE UserName = ?", [login], function (err, result, fields) {
        if (err) {
            throw err;
        }

        const user = new User(result[0].ID, result[0].UserName, result[0].Password);
        const tasks = requestBody.map(task => new Task(task.id, task.task, task.taskContainerId, user.id));
        connection.query("SELECT * FROM TASK", function (err, result, fields) {
            if (err) {
                throw err;
            }

            const ids = result.map(task => task.ID);
            const tasksNotInDB = tasks.filter(task => !ids.includes(task.id));
            const tasksInDB = tasks.filter(task => ids.includes(task.id));
            if (tasksInDB.length > 0) {
                tasksInDB.forEach(task => connection.query("DELETE FROM TASK WHERE ID = ?)", [task.id], function (err, result, fields) {
                    if (err) {
                        throw err;
                    }

                    connection.query("INSERT INTO TASK (ID, TaskName, TaskContainerId, UserId) VALUES (?)", tasks, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }

                        res.status(200).json({response: "Tasks was updated successfully!"})
                    })
                }));
            } else {
                const convertedTasks = tasksNotInDB.reduce((task1, task2) => {
                    let array = [];
                    array.push(task2.id);
                    array.push(task2.taskName);
                    array.push(task2.taskContainerId);
                    array.push(task2.userId);
                    task1.push(array);
                    return task1;
                }, []);
                connection.query("INSERT INTO TASK (ID, TaskName, TaskContainerId, UserId) VALUES (?)", convertedTasks, function (err, result, fields) {
                    //TODO dodaje tylko jeden task

                    if (err) {
                        throw err;
                    }

                    res.status(200).json({response: "New tasks added into database!"});
                })
            }
        })
    });
};
