-- Drops the company_db if it already exists --
DROP DATABASE IF EXISTS company_db;

-- Created the DB "company_db"
CREATE DATABASE company_db;

-- Use the DB company_db for all the rest of the script
USE company_db;

-- Created the table "departments"
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,

    name VARCHAR(30) NOT NULL,

    PRIMARY KEY(department_id)
);

-- Created the table "roles"
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,

    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,

    department_id INT NOT NULL,

    PRIMARY KEY(role_id),
    FOREIGN KEY(department_id) REFERENCES departments(department_id)

);

-- Created the table "employees"
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT NOT NULL,

    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

    role_id INT NOT NULL,
    manager_id INT,

    PRIMARY KEY(employee_id),
    FOREIGN KEY(role_id) REFERENCES roles(role_id),
    FOREIGN KEY(manager_id) REFERENCES employees(employee_id)
);
