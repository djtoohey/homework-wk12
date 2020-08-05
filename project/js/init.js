const inquirer = require("inquirer");
const mysql = require("mysql");

var addDepartment = require("./add/addDepartment.js");


function init(connection) {
    console.log(connection.threadId);
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?:",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "END"
        ]
    }).then(function (data = { option }) {
        switch (data.option) {
            case "Add Department":
                addDepartment(connection, init);

                break;

            case "Add Role":
                addRole(connection);
                break;

            case "Add Employee":
                addEmployee(connection);
                break;
            default:
                break;
        }
    });
}

module.exports = init;