const inquirer = require("inquirer");
const mysql = require("mysql");

var init = require("./../init.js");

module.exports = function (connection) {
    console.log(connection.threadId);
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?:"
    }).then(function (data = { newDepartment }) {
        console.log(data.newDepartment)
        connection.query(
            `INSERT INTO departments (name) VALUES ("${data.newDepartment}");`,
            function (err, res) {
                if (err) throw err;
                console.log(`Added New Department: ${data.newDepartment}`);
                init(connection);
            });
    });

}