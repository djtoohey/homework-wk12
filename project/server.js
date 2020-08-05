// dependencies
// const inquirer = require("inquirer");
const mysql = require("mysql");

var init = require("./js/init.js");

// var addDepartment = require("./js/add/addDepartment.js")


// MySQL DB Connection Information
const connection = mysql.createConnection({
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
    console.log(connection.threadId);
    init(connection);
});


// function init() {
//     inquirer.prompt({
//         name: "option",
//         type: "list",
//         message: "What would you like to do?:",
//         choices: [
//             "Add Department",
//             "Add Role",
//             "Add Employee",
//             "END"
//         ]
//     }).then(function (data = { option }) {
//         switch (data.option) {
//             case "Add Department":
//                 addDepartment(connection);
//                 break;

//             case "Add Role":
//                 addRole();
//                 break;

//             case "Add Employee":
//                 addEmployee();
//                 break;
//             default:
//                 break;
//         }
//     });
// }

// function addDepartment() {
//     inquirer.prompt({
//         name: "newDepartment",
//         type: "input",
//         message: "What department would you like to add?:"
//     }).then(function (data = { newDepartment }) {
//         console.log(data.newDepartment)
//         connection.query(
//             `INSERT INTO departments (name) VALUES ("${data.newDepartment}");`,
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(`Added New Department: ${data.newDepartment}`);

//             });
//     });
//     init();
// }

// function addRole() {

//     var departmentNames = [];

//     connection.query(`SELECT * FROM departments`, function (err, result) {
//         if (err) throw err;

//         for (let i = 0; i < result.length; i++) {
//             const department = result[i];

//             departmentNames.push(department.name);
//         }

//         inquirer.prompt([
//             {
//                 name: "department",
//                 type: "list",
//                 message: "Which Department would you like to add the role to?:",
//                 choices: departmentNames,
//             }, {
//                 name: "newRole",
//                 type: "input",
//                 message: "What role would you like to add?:"
//             }, {
//                 name: "salary",
//                 type: "input",
//                 message: "What is the salary of the role?:"
//             }
//         ]).then(function (data = { department, newRole, salary }) {

//             var department;
//             // console.log(1, data.department);
//             for (let i = 0; i < departmentNames.length; i++) {
//                 // console.log(result[i]);
//                 if (result[i].name === data.department) {
//                     department = result[i].department_id
//                     // console.log(15, department)
//                 }
//                 // console.log(2, department)
//             }
//             // console.log(3, department)
//             connection.query(
//                 `INSERT INTO roles (title, salary, department_id) VALUES ("${data.newRole}", ${data.salary}, ${department});`,
//                 function (err, res) {
//                     if (err) throw err;
//                     console.log(`Added New Role: ${data.newRole}`);

//                 });
//         })
//     });

//     init();

// }

// function addEmployee() {
//     // get list of departments by name
//     var departmentNames = [];

//     connection.query(`SELECT * FROM departments`, function (err, departments) {
//         if (err) throw err;

//         for (let i = 0; i < departments.length; i++) {
//             const department = departments[i];

//             departmentNames.push(department.name);
//         }

//         // ask qs first and last name, department
//         inquirer.prompt([
//             {
//                 name: "first_name",
//                 type: "input",
//                 message: "What is the employee's first name?:"
//             }, {
//                 name: "last_name",
//                 type: "input",
//                 message: "What is the employee's last name"
//             }, {
//                 name: "department",
//                 type: "list",
//                 message: "What department will the employee work in?:",
//                 choices: departmentNames
//             },
//         ]).then(function (data = { first_name, last_name, department }) {
//             var departmentID;

//             for (let i = 0; i < departmentNames.length; i++) {
//                 if (departments[i].name === data.department) {
//                     departmentID = departments[i].department_id;
//                 }
//             }

//             connection.query(`SELECT * FROM roles WHERE department_id = ${departmentID}`, function (err, roles) {
//                 var rolesArr = [];
//                 for (let i = 0; i < roles.length; i++) {
//                     rolesArr.push(roles[i].title);

//                 }
//                 inquirer.prompt(
//                     {
//                         name: "role",
//                         type: "list",
//                         message: "What is the role of the employee?:",
//                         choices: rolesArr
//                     }).then(function (role = { role }) {
//                         console.log(data.first_name, data.last_name, data.department, role.role);

//                         var roleID;
//                         var currDepartment;

//                         for (let i = 0; i < rolesArr.length; i++) {

//                             if (roles[i].title === role.role) {
//                                 roleID = roles[i].role_id;
//                                 currDepartment = roles[i].department_id;

//                             }
//                         }


//                         if (role.role === "Manager") {
//                             connection.query(
//                                 `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${data.first_name}", "${data.last_name}", ${roleID});`,
//                                 function (err, res) {
//                                     if (err) throw err;
//                                     console.log(`Added New Employee: ${data.first_name} ${data.last_name}`);

//                                 });
//                         }
//                         else {
//                             connection.query(`SELECT * FROM roles WHERE department_id = ${currDepartment};`,
//                                 function (err, result1) {
//                                     if (err) throw err;

//                                     var manager;
//                                     for (let i = 0; i < result1.length; i++) {
//                                         if (result1[i].title === "Manager") {
//                                             manager = result1[i];
//                                         }
//                                     }

//                                     connection.query(`SELECT * FROM employees WHERE manager_id IS NULL;`,
//                                         function (err, result2) {
//                                             if (err) throw err;
//                                             var depManager;
//                                             for (let i = 0; i < result2.length; i++) {
//                                                 if (manager.role_id === result2[i].role_id) {
//                                                     depManager = result2[i].employee_id;
//                                                 }
//                                             }

//                                             connection.query(
//                                                 `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${roleID}, ${depManager});`,
//                                                 function (err, res) {
//                                                     if (err) throw err;
//                                                     console.log(`Added New Employee: ${data.first_name} ${data.last_name}`);

//                                                 });
//                                         });
//                                 })
//                         }
//                         init();
//                     })
//             })
//         })
//     })
// }
