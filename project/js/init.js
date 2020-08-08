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
            "END"
        ]
    }).then(function (data = { option }) {
        switch (data.option) {
            case "Add Department":
                add.addDepartment(connection, init);
                // init(connection)
                // console.log("addD");
                break;

            case "Add Role":
                add.addRole(connection, init);
                // console.log("addR");
                break;

            case "Add Employee":
                // console.log("addE");
                add.addEmployee(connection, init);

                break;
            case "Update Employee Manager":
                update.updateEmployeeManager(connection, init);
            default:
                break;
        }
    });
}

module.exports = init;