const inquirer = require("inquirer");

// Call in SQL functions in the .then to populate the db based off of inquirer prompts

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//start function like greatbay?? async??

function firstQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "view all the roles",
          "view all the departments",
          "view all employees",
          "view employees by role",
          "view employees by department",
          "view employees by manager",
          "add employee",
          "add role",
          "add department",
          "update employee role",
          "remove employee",
          "remove role",
          "remove department",
        ],
      },
  ])
   .then((userAnswer) => {
       switch (userAnswer.userAction) {
        case 'view all roles':
         viewAllRoles();
         break;
        case 'view all departments':
         viewAllDepartments();
         break;
        case 'view all employees':
          viewAllEmployees();
          break;
        case 'view all employees by role':
          viewAllEmployeesByRole();
          break;
        case 'view all employees by department':
          viewAllEmployeesByDepartment();
          break;
        case 'view all employees by manager':
          viewAllEmployeesByManager();
          break;
        case 'add employee':
          addEmployee();
            break;
        case 'add role':
          addRole();
          break;
        case 'add department':
          addDepartment();
          break;
        case 'update employee role':
          updateEmployeeRole();
          break;
        case 'remove Employee':
          removeEmployee();
          break;
        case 'remove role':
          removeRole();
          break;
        case 'remove department':
          removeDepartment();
          break;
   }});

//view all roles
function viewAllRoles() {
   /*  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
    from employee \
    join role on employee.role_id = role.id \
    join department on role.department_id = department.id \
    Left join employee as employee_m on  employee.manager_id  = employee_m.id;"; */
  connection.query("SELECT * FROM ROLES", function (err, res) {
    if (err) throw err;
    console.table(res);
    //not sure if this is needed
    connection.end();
  });
}
function viewAllEmployees() {
  /*  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
   from employee \
   join role on employee.role_id = role.id \
   join department on role.department_id = department.id \
   Left join employee as employee_m on  employee.manager_id  = employee_m.id;"; */
 connection.query("SELECT * FROM EMPLOYEES", function (err, res) {
   if (err) throw err;
   console.table(res);
   //not sure if this is needed
   connection.end();
 });
}
function viewAllDepartments() {
  /*  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
   from employee \
   join role on employee.role_id = role.id \
   join department on role.department_id = department.id \
   Left join employee as employee_m on  employee.manager_id  = employee_m.id;"; */
 connection.query("SELECT * FROM DEPARTMENTS", function (err, res) {
   if (err) throw err;
   console.table(res);
   //not sure if this is needed
   connection.end();
 });
}
//view employee by role, deparatment and manager
function viewAllEmployeesByRole() {
  /*  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
   from employee \
   join role on employee.role_id = role.id \
   join department on role.department_id = department.id \
   Left join employee as employee_m on  employee.manager_id  = employee_m.id;"; */
 connection.query("SELECT * FROM ROLES", function (err, res) {
   if (err) throw err;
   console.table(res);
   //not sure if this is needed
   connection.end();
 });
}
function viewAllEmployeesByDepartment() {
 /*  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
  from employee \
  join role on employee.role_id = role.id \
  join department on role.department_id = department.id \
  Left join employee as employee_m on  employee.manager_id  = employee_m.id;"; */
connection.query("SELECT * FROM EMPLOYEES", function (err, res) {
  if (err) throw err;
  console.table(res);
  //not sure if this is needed
  connection.end();
});
}
function viewAllEmployeesByManager() {
 /*  let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
  from employee \
  join role on employee.role_id = role.id \
  join department on role.department_id = department.id \
  Left join employee as employee_m on  employee.manager_id  = employee_m.id;"; */
connection.query("SELECT * FROM DEPARTMENTS", function (err, res) {
  if (err) throw err;
  console.table(res);
  //not sure if this is needed
  connection.end();
});
}

//add replies 
 function addEmployee (reply) {
  if (reply.choice === "addEmployee") {
  inquirer
    .prompt([
    {
    type: "input",
    message: "What is the employee's first name?",
    name: "firstName",
    },
    {
    type: "input",
    message: "What the employee's last name?",
    name: "lastName",
    },
    {
    type: "input",
    message: "What is the employee's role ID?",
    name: "role",
    },
    {
    type: "input",
    message: "What is the employee's manager's ID?",
    name: "managerId",
    },
    ])

    .then(function (addEmployeeReply) {
    var newEmployee = new Employee(
      addEmployeeReply.firstName,
      addEmployeeReply.lastName,
      addEmployeeReply.role,
      addEmployeeReply.managerId
        );
      console.log(newEmployee);
      // employeeId = employeeId++;
      addEmployee(newEmployee);
      // newTeamMember();
    })
      function addEmployee(employee) {
      console.log("Adding a new employee...\n");
      var query = connection.query(
      "INSERT INTO employee SET ?",
      {
      first_name: employee.firstName,
      last_name: employee.lastName,
      role_id: employee.role,
      manager_id: employee.managerId,
      },
      function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "employee added \n");}
              );
 }}

 function addRole (reply) {
  if (reply.choice === "addRole") {
  inquirer
  .prompt ({[{
    //Do I need to add id here to match workbench
    type: "input",
    message: "What is the role title you would like to add",
    name: "title",
    },
    {
    type: "input",
    message: "What the role salary?",
    name: "salary",
    },
    {
    type: "input",
    message: "what is the dapartment id?",
    //in workbench its deparment_id under role table
    name: "departmentId",
    }
    ])
    
    .then(function (addRoleReply) {
    var newRole = new Role(
      newRoleReply.id,
      newRoleReply.title,
      newRoleReply.salary,
      newRoleReply.department_Id
        );
      //console.log(newEmployee);
      // employeeId = employeeId++;
      // addEmployee(newEmployee);
      // newTeamMember();
    })
      function addRole(role) {
      console.log("Adding a new role...\n");
      var query = connection.query(
      "INSERT INTO role SET ?",
      {
      title: role.title,
      salary: role.salary,
      dapartment_id: department.daparmenId,
      },
      function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "role added \n");}
              );
 }}

//update replies?

//remove replies


//this function views all the employees by pulling from database
function viewAllEmployees() {
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
  }