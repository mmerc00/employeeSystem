INSERT INTO department (department_name)
values("Sales"),("HR"),("Maintenance");
INSERT INTO roles (title, salary, department_id)
values("Cashier", 135000.00, 1),("Manager", 150000.00, 1),("Talent", 160000.00, 2),("Janitor", 120000.00, 3);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
values("Melis","Mercado", 1, 1);
-- Select employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name
-- from employee
-- join roles on employee.roles_id = roles.id
-- join department on role.department_id = department.id;
-- -- need to join employee.manager_id with their manager's name
Select employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname
from employee 
join roles on employee.roles_id = roles.id
join department on roles.department_id = department.id
Left join employee as employee_m on  employee.manager_id  = employee_m.id;
select * from department;
select * from roles;
select * from employee;






