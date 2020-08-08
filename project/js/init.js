const inquirer = require("inquirer");
const mysql = require("mysql");

// const connection = require("../server.js")
const add = require("./add.js");
const update = require("./update.js");

function init(connection) {
    console.log("init", connection.threadId);
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?:",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Manager",
            "Update Employee Role",
            "END"
        ]
    }).then(function (data = { option }) {
        switch (data.option) {
            case "Add Department":
                add.addDepartment(connection, init);
                break;

            case "Add Role":
                add.addRole(connection, init);
                break;

            case "Add Employee":
                add.addEmployee(connection, init);
                break;
            case "Update Employee Manager":
                update.updateEmployeeManager(connection, init);
                break;
            case "Update Employee Role":
                update.updateEmployeeRole(connection, init);
                break;
            default:
                break;
        }
    });
}

module.exports = init;