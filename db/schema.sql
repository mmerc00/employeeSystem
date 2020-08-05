DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
FOREIGN KEY (department_id) references department(id),
FOREIGN KEY (manager_id) references manager(id)


);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) references department(id)
);
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);
INSERT INTO department (department_name)

-- values("Sales"),("HR"),("Maintenance");
INSERT INTO role (title, salary, department_id)

-- values("Cashier", 35000.00, 1),("Manager", 50000.00, 1),("Talent", 60000.00, 2),("Janitor", 20000.00, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

values("sales"),("hr"),("maintence");
-- Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name
-- from employee
-- join role on employee.role_id = role.id
-- join department on role.department_id = department.id;
-- -- need to join employee.manager_id with their manager's name
Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname
from employee 

join role on employee.role_id = role.id

join department on role.department_id = department.id

Left join employee as employee_m on  employee.manager_id  = employee_m.id;

select * from department;
select * from role;
select * from employee;