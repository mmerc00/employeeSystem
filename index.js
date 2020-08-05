// connect to SQL and Inquirer
var mysql = require("mysql");
// put connection at the top

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employees_DB",
});

// Create questions for inquirer .prompts and .thens
connection.connect(function (err) {
  if (err) throw err;
});

/* function viewAllEmployees() {
  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
  from employee \
  join role on employee.role_id = role.id \
  join department on role.department_id = department.id \
  Left join employee as employee_m on  employee.manager_id  = employee_m.id;";
connection.query(query, function (err, res) {
  if (err) throw err;
  console.table(res);
  //not sure if this is needed
  connection.end();
});
} */
// three depts

// helper Functions to use in the .then with inq Prompts as callbacks
