const inquirer = require("inquirer");
const mysql = require("mysql");

var init = require("../init.js");

function addRole(connection, init) {
    console.log("addRole", connection.threadId);
    var departmentNames = [];

    connection.query(`SELECT * FROM departments`, function (err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            const department = result[i];

            departmentNames.push(department.name);
        }

        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "Which Department would you like to add the role to?:",
                choices: departmentNames,
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

            var department;
            // console.log(1, data.department);
            for (let i = 0; i < departmentNames.length; i++) {
                // console.log(result[i]);
                if (result[i].name === data.department) {
                    department = result[i].department_id
                    // console.log(15, department)
                }
                // console.log(2, department)
            }
            // console.log(3, department)
            connection.query(
                `INSERT INTO roles (title, salary, department_id) VALUES ("${data.newRole}", ${data.salary}, ${department});`,
                function (err, res) {
                    if (err) throw err;
                    console.log(`Added New Role: ${data.newRole}`);

                });
        })
    });

    init(connection);

}

module.exports = addRole;