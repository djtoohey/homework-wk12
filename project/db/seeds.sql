USE company_db;

INSERT INTO departments (name)
VALUES ("Sales"),("management");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 1000.00,1), ("Sales Rep", 500.00,1), ("Gypsy", 1000,2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("John", "Smith", 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 2, 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("John", "Doe", 3);
