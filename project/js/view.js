const inquirer = require("inquirer");
const mysql = require("mysql");

function viewAllEmployees(connection, init, condition = "") {
    var queryString = `SELECT * FROM employees AS tOne 
    LEFT JOIN roles AS tTwo 
    ON tOne.role_id = tTwo.role_id
    LEFT JOIN departments AS tThree 
    ON tTwo.department_id = tThree.department_id`;

    if (condition === "Department") {
        let departmentName = [];

        connection.query("SELECT * FROM departments", function (err, departments) {
            if (err) throw err;

            for (let i = 0; i < departments.length; i++) {

                departmentName.push(departments[i].name);

            }

            inquirer.prompt([
                {
                    name: "searchDepartment",
                    type: "list",
                    message: "Which department do you want to view by?:",
                    choices: departmentName
                },
            ]).then(function (departmentPrompt = { searchDepartment }) {

                for (let i = 0; i < departments.length; i++) {
                    if (departments[i].name === departmentPrompt.searchDepartment) {
                        queryString += ` WHERE tTwo.department_id= ${departments[i].department_id}`;
                    }

                }
                connection.query(queryString, function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    init(connection);
                })
            })
        })
    }

    else if (condition === "Role") {

        let roleName = [];

        connection.query("SELECT * FROM roles", function (err, roles) {
            if (err) throw err;

            for (let i = 0; i < roles.length; i++) {

                roleName.push(roles[i].title);

            }

            inquirer.prompt([
                {
                    name: "searchRole",
                    type: "list",
                    message: "Which role do you want to view by?:",
                    choices: roleName
                },
            ]).then(function (rolePrompt = { searchRole }) {

                for (let i = 0; i < roles.length; i++) {

                    if (roles[i].title === rolePrompt.searchRole) {

                        queryString += ` WHERE tTwo.role_id= ${roles[i].role_id}`;
                    }

                }

                connection.query(queryString, function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    init(connection);
                })
            })
        })
    }

    else if (condition === "Manager") {

        let managerName = [];

        connection.query("SELECT * FROM employees where manager_id is NULL", function (err, managers) {
            if (err) throw err;

            for (let i = 0; i < managers.length; i++) {
                let fullName = managers[i].first_name + " " + managers[i].last_name;
                managerName.push(fullName);

            }

            inquirer.prompt([
                {
                    name: "searchManager",
                    type: "list",
                    message: "Which manager do you want to view by?:",
                    choices: managerName
                },
            ]).then(function (managerPrompt = { searchManager }) {

                for (let i = 0; i < managers.length; i++) {
                    let fullName = managers[i].first_name + " " + managers[i].last_name;
                    if (fullName === managerPrompt.searchManager) {

                        queryString += ` WHERE manager_id= ${managers[i].employee_id}`;
                    }

                }

                connection.query(queryString, function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    init(connection);
                })
            })
        })
    }

    else {
        connection.query(queryString, function (err, employees) {
            console.table(employees);
            init(connection);
        })
    }
}


module.exports = {
    viewAllEmployees
};