const inquirer = require("inquirer");
const connection = require("./db/SQL");

// Call in SQL functions in the .then to populate the db based off of inquirer prompts

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//start function like greatbay?? async??
start();
function start() {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "view all the roles",
        "view all the departments",
        "view all the employees",
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
    })
    .then((userAnswer) => {
      switch (userAnswer.userAction) {
        case "view all the roles":
          viewAllRoles();
          break;
        case "view all the departments":
          viewAllDepartments();
          break;
        case "view all the employees":
          viewAllEmployees();
          break;
        case "view all employees by role":
          viewAllEmployeesByRole();
          break;
        case "view all employees by department":
          viewAllEmployeesByDepartment();
          break;
        case "view all employees by manager":
          viewAllEmployeesByManager();
          break;
        case "add employee":
          addEmployee();
          break;
        case "add role":
          addRole();
          break;
        case "add department":
          addDepartment();
          break;
        case "update employee role":
          // TODO:
          updateEmployeeRole();
          break;
        case "remove Employee":
          // TODO:
          removeEmployee();
          break;
        case "remove role":
          // TODO:
          removeRole();
          break;
        case "remove department":
          // TODO:
          removeDepartment();
          break;

        default:
          connection.end();
      }
    });
}

//view all roles
function viewAllRoles() {
  let qry = "SELECT ";
  qry += "role.id as role_id, ";
  qry += "role.title as role, ";
  qry += "role.salary, ";
  qry += "role.department_id, ";
  qry += "department.department_name ";
  qry += "FROM role ";
  qry += "join department ON role.department_id = department.id";
  connection.query(qry, function (err, res) {
    if (err) throw err;
    console.table(res);

    start();
  });
}
//view all
function viewAllEmployees() {
  let qry = "SELECT ";
  qry += "employee.id as employee_id, ";
  qry += "employee.first_name as first.name, ";
  qry += "employee.last_name as last.name, ";
  qry += "employee.role_id, ";
  qry += "employee.manager_id ";
  qry += "FROM employee ";
  qry += "join role ON employee.role_id = role.id ";
  qry += "join manager ON employee.employee_id = employee.id";
  console.log("VIEW ALL EMPLOYEES", qry);
  connection.query(qry, function (err, res) {
    if (err) throw err;
    console.table(res);

    start();
  });
}
function viewAllDepartments() {}

//view employee by role, deparatment and manager
function viewAllEmployeesByRole() {
  connection.query("SELECT * FROM ROLES", function (err, res) {
    if (err) throw err;
    console.table(res);
    //not sure if this is needed
    connection.end();
  });
}
function viewAllEmployeesByDepartment() {
  connection.query("SELECT * FROM EMPLOYEES", function (err, res) {
    if (err) throw err;
    console.table(res);
    //not sure if this is needed
    connection.end();
  });
}
function viewAllEmployeesByManager() {
  connection.query("SELECT * FROM DEPARTMENTS", function (err, res) {
    if (err) throw err;
    console.table(res);
    //not sure if this is needed
    connection.end();
  });
}

//add replies
function addEmployee() {
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
    });
}

function addRole() {}

function addDepartment() {
  inquirer
    .prompt({
      //Do I need to add id here to match workbench
      type: "input",
      message: "What is the department name you would like to add",
      name: "department name",
    })

    .then(function (addDepartmentReply) {
      var newDepartment = new Department(newDepartmentReply.id);
      //console.log(newEmployee);
      // employeeId = employeeId++;
      // addEmployee(newEmployee);
      // newTeamMember();
    });
}

//update replies?
// console.log("Adding a new role...\n");
// var query = connection.query(
// "INSERT INTO department SET",
// {
// dapartment_name: department.departmentName,
// },
// function (err, res) {
// if (err) throw err;
// console.log(res.affectedRows + "role added \n");}
//         );

//remove replies
// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");

//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry",
//     },
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

//this function views all the employees by pulling from database
// function viewAllEmployees() {
//       let query = "Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname \
//       from employee \
//       join role on employee.role_id = role.id \
//       join department on role.department_id = department.id \
//       Left join employee as employee_m on  employee.manager_id  = employee_m.id;";
//     connection.query(query, function (err, res) {
//       if (err) throw err;
//       console.table(res);
//       //not sure if this is needed
//       connection.end();
//     });
//   }
