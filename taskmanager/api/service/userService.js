const User = require('../entity/User');

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
    const user = new User(requestBody.login, requestBody.password);
    connection.query("SELECT COUNT(*) AS userCount FROM USER WHERE UserName = ? AND Password = ?", [user.login, user.password],
        function (err, result, fields) {
        if (err) {
            throw err;
        }

        const isCorrectData = parseInt(result[0].userCount) === 1;
        res.status(200).json({response: isCorrectData});
    });
};
