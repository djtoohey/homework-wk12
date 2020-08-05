-- Drops the company_db if it already exists --
DROP DATABASE IF EXISTS company_db;

-- Created the DB "company_db"
CREATE DATABASE company_db;

-- Use the DB company_db for all the rest of the script
USE company_db;

-- Created the table "department"
CREATE TABLE department (
    id int AUTO_INCREMENT NOT NULL,
    name varchar(30) NOT NULL,
    PRIMARY KEY(id)
);

-- Created the table "role"
CREATE TABLE role (
    id int AUTO_INCREMENT NOT NULL,
    title varchar(30) NOT NULL,
    salary decimal NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

-- Created the table "employee"
CREATE TABLE employee (
    id int AUTO_INCREMENT NOT NULL,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);
