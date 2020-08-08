const inquirer = require("inquirer");
const mysql = require("mysql");
// const init = require("./init");

function addDepartment(connection, init) {

    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?:"
    }).then(function (data = { newDepartment }) {

        connection.query(
            `INSERT INTO departments (name) VALUES ("${data.newDepartment}");`,
            function (err, res) {
                if (err) throw err;
                console.log(`Added New Department: ${data.newDepartment}`);
                init(connection);
            });
    });


}

function addRole(connection, init) {

    var departmentNames = [];
    var roleNames = [];

    connection.query(`SELECT * FROM departments`, function (err, dep) {
        if (err) throw err;

        for (let i = 0; i < dep.length; i++) {
            const department = dep[i];

            departmentNames.push(department.name);
        }

        connection.query(`SELECT * FROM roles`, function (err, result) {
            if (err) throw err;

            for (let i = 0; i < result.length; i++) {
                const role = result[i];

                roleNames.push(role.title);
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
                    message: "What role would you like to add?:",
                    validate: function (newRole) {
                        var valid = true;

                        for (let i = 0; i < roleNames.length; i++) {
                            if (newRole === roleNames[i]) {
                                console.log(newRole, roleNames[i]);
                                valid = false;
                            }

                        }

                        if (valid) {
                            return true;
                        }
                        else {
                            console.log("Please put in a unique role");
                        }
                    }
                }, {
                    name: "salary",
                    type: "input",
                    message: "What is the salary of the role?:",
                    validate: function (salary) {
                        if (!isNaN(salary)) {
                            return true
                        }
                        else {
                            console.log("Please input a number.")
                        }
                    }
                }
            ]).then(function (data = { department, newRole, salary }) {

                var department;
                for (let i = 0; i < departmentNames.length; i++) {
                    if (dep[i].name === data.department) {
                        department = dep[i].department_id
                    }
                }
                connection.query(
                    `INSERT INTO roles (title, salary, department_id) VALUES ("${data.newRole}", ${data.salary}, ${department});`,
                    function (err, res) {
                        if (err) throw err;
                        console.log(`Added New Role: ${data.newRole}`);
                        init(connection);
                    });
            })
        });



    })
}

function addEmployee(connection, init) {
    var employeeNames = ["None"];
    var roleNames = [];


    connection.query(`SELECT * FROM employees`, function (err, employees) {
        if (err) throw err;
        connection.query(`SELECT * FROM roles`, function (err, roles) {
            if (err) throw err;

            for (let i = 0; i < employees.length; i++) {
                let employee = employees[i];

                let employeeFullName = employee.first_name + " " + employee.last_name

                employeeNames.push(employeeFullName);
            }

            for (let i = 0; i < roles.length; i++) {
                let role = roles[i];

                roleNames.push(role.title);
            }

            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?:"
                }, {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name"
                }, {
                    name: "role",
                    type: "list",
                    message: "What is the employee's role?:",
                    choices: roleNames
                }, {
                    name: "manager",
                    type: "list",
                    message: "Who is the employee's manager?:",
                    choices: employeeNames
                },
            ]).then(function (data = { first_name, last_name, role, manager }) {
                let roleID;
                let managerID;

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].title === data.role) {
                        roleID = roles[i].role_id;
                    }
                }

                for (let i = 0; i < employees.length; i++) {
                    const employeeFullName = employees[i].first_name + " " + employees[i].last_name
                    if (employeeFullName === data.manager) {
                        managerID = employees[i].employee_id;
                    }
                }

                if (data.manager === "None") {
                    connection.query(
                        `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${data.first_name}", "${data.last_name}", ${roleID});`,
                        function (err, res) {
                            if (err) throw err;
                            console.log(`Added New Employee: ${data.first_name} ${data.last_name}`);
                            init(connection);
                        });
                }

                else {
                    connection.query(
                        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${roleID}, ${managerID});`,
                        function (err, res) {
                            if (err) throw err;
                            console.log(`Added New Employee: ${data.first_name} ${data.last_name}`);
                            init(connection);
                        });
                }
            })
        })
    })
}



module.exports = {
    addEmployee,
    addRole,
    addDepartment
};