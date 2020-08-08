const inquirer = require("inquirer");
const mysql = require("mysql");

// const connection = require("../server.js")
const add = require("./add.js");
const update = require("./update.js");
const view = require("./view.js");
const remove = require("./remove.js");


function init(connection) {
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
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View All Employees By Role",
            "View All Departments",
            "View All Roles",
            "View All Managers",
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
            case "View All Employees":
                view.viewAllEmployees(connection, init);
                break;
            case "View All Employees By Department":
                view.viewAllEmployees(connection, init, "Department");
                break;
            case "View All Employees By Role":
                view.viewAllEmployees(connection, init, "Role");
                break;
            case "View All Employees By Manager":
                view.viewAllEmployees(connection, init, "Manager");
                break;
            case "View All Managers":
                view.viewAll(connection, init, "Managers");
                break;
            case "View All Departments":
                view.viewAll(connection, init, "Departments");
                break;
            case "View All Roles":
                view.viewAll(connection, init, "Roles");
                break;
            default:
                process.exit(1);
                break;
        }
    });
}

module.exports = init;