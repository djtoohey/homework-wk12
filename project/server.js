// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
// const addDepartment = require("./js/add/addDepartment.js")


// MySQL DB Connection Information
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "jayisgay123",
    database: "company_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    init();
});


function init() {
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?:",
        choices: [
            "Add Department",
            "Add Role",
            "END"
        ]
    }).then(function (data = { option }) {
        switch (data.option) {
            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;
            default:
                break;
        }
    });
}

function addDepartment() {
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
                init();
            });
    });
}

function addRole() {
    var departments = [];
    connection.query(`SELECT * FROM departments`, function (err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            const department = result[i];
            departments.push(department.name);

        }

        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "Which Department would you like to add the role to?:",
                choices: departments,
            }, {
                name: "newRole",
                type: "input",
                message: "What role would you like to add?:"
            }, {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?:"
            }
        ]).then(function (data = { department, newRole, salary }) {
            connection.query(
                `INSERT INTO roles (title, salary) VALUES ("${data.newRole}", ${data.salary});`,
                function (err, res) {
                    if (err) throw err;
                    console.log(`Added New Role: ${data.newRole}`);
                    init();
                });
        })
    });

}
