const inquirer = require("inquirer");
const mysql = require("mysql");

function updateEmployeeManager(connection, init) {

    const employeeList = [];
    connection.query(`SELECT * FROM employees`, function (err, employees) {
        if (err) throw err;

        for (let i = 0; i < employees.length; i++) {
            let employeeFullName = employees[i].first_name + " " + employees[i].last_name;
            employeeList.push(employeeFullName);

        }

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee's manager do you want to update?:",
                choices: employeeList
            },
        ]).then(function (employeePrompt = { employee }) {
            const managerList = []

            for (let i = 0; i < employeeList.length; i++) {
                if (employeeList[i] !== employeePrompt.employee) {
                    managerList.push(employeeList[i]);
                }
            }

            inquirer.prompt([
                {
                    name: "newManager",
                    type: "list",
                    message: "Which employee do you want to set as manager for selected employee?:",
                    choices: managerList
                }

            ]).then(function (managerPrompt = { newManager }) {

                let managerID;
                let employeeID;

                // managerid
                for (let i = 0; i < employees.length; i++) {
                    let employeeFullName = employees[i].first_name + " " + employees[i].last_name;
                    if (employeeFullName === managerPrompt.newManager) {
                        managerID = employees[i].employee_id;
                    }

                }

                // employee id
                for (let i = 0; i < employees.length; i++) {
                    let employeeFullName = employees[i].first_name + " " + employees[i].last_name;
                    if (employeeFullName === employeePrompt.employee) {
                        employeeID = employees[i].employee_id;
                    }

                }

                connection.query(`UPDATE employees SET manager_id = ${managerID} WHERE (employee_id = ${employeeID});`, function (err, employees) {
                    if (err) throw err;
                    console.log("Updated Employee's Manager");
                    init(connection);
                })
            })
        })
    })
}


function updateEmployeeRole(connection, init) {
    // UPDATE employees SET `first_name` = 'Dick' WHERE (`employee_id` = '8');
    const employeeList = [];
    connection.query(`SELECT * FROM employees`, function (err, employees) {
        if (err) throw err;

        for (let i = 0; i < employees.length; i++) {
            let employeeFullName = employees[i].first_name + " " + employees[i].last_name;
            employeeList.push(employeeFullName);

        }

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee's role do you want to update?:",
                choices: employeeList
            },
        ]).then(function (employeePrompt = { employee }) {
            const roleList = []

            connection.query(`SELECT * FROM roles`, function (err, roles) {
                if (err) throw err;

                for (let i = 0; i < roles.length; i++) {
                    roleList.push(roles[i].title);
                }

                inquirer.prompt([
                    {
                        name: "newRole",
                        type: "list",
                        message: "Which role do you want to set as the role for selected employee?:",
                        choices: roleList
                    }

                ]).then(function (rolePrompt = { newRole }) {

                    let roleID;
                    let employeeID;

                    // role id
                    for (let i = 0; i < roles.length; i++) {

                        if (roles[i].title === rolePrompt.newRole) {
                            roleID = roles[i].role_id;
                        }
                    }

                    // employee id
                    for (let i = 0; i < employees.length; i++) {
                        let employeeFullName = employees[i].first_name + " " + employees[i].last_name;
                        if (employeeFullName === employeePrompt.employee) {
                            employeeID = employees[i].employee_id;
                        }

                    }

                    connection.query(`UPDATE employees SET role_id = ${roleID} WHERE (employee_id = ${employeeID});`, function (err, employees) {
                        if (err) throw err;
                        console.log("Updated Employee's Role");
                        init(connection);
                    })
                })
            })
        })
    })
}

module.exports = {
    updateEmployeeManager,
    updateEmployeeRole,
};