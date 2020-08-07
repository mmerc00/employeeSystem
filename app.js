var inquirer = require("inquirer");
// Call in SQL functions in the .then to populate the db based off of inquirer prompts
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
var mysql = require("mysql");
// put connection at the top
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "mysqlpsw",
  database: "employeesDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

start();
// start function
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
        "view employees by roles",
        "view employees by department",
        "add employee",
        "add roles",
        "add department",
        "update employee",
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
        case "view all employees by roles":
          viewAllEmployeesByRoles();
          break;
        case "view all employees by department":
          viewAllEmployeesByDepartment();
          break;
        case "add employee":
          addEmployee();
          break;
        case "add roles":
          addRoles();
          break;
        case "add department":
          addDepartment();
          break;
        case "update employee":
          updateEmployee();
          break;
        default:
          connection.end();
      }
    });

  // View functions
  function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }
  function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }
  function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

  function viewAllEmployeesByRoles() {
    let rolesArray = [];
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        rolesArray.push(res[i].title);
      }
      console.log(rolesArray);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which roles of employees do you want to see?",
            choices: rolesArray,
            name: "roles",
          },
        ])
        .then((answer) => {
          const rolesChoice = answer.roles;
          console.log(rolesChoice);
          connection.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            console.table(res);
            const rolesName = [];
            for (let i = 0; i < res.length; i++) {
              if (res[i].title === rolesChoice) {
                rolesName.push(res[i].first_name + " " + res[i].last_name);
              }
              console.log(rolesName);
              start();
            }
          });
        });
    });
  }
  // ADD EMPLOYEE========================================================================
  function addEmployee() {
    // Questions being asked for the user
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the last name of the employee?",
          name: "lastName",
        },
        {
          type: "input",
          message: "What is the employees role id number?",
          name: "rolesID",
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID",
        },
      ])
      .then(function (answer) {
        // query implementation
        let query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.rolesID}, ${answer.managerID})`;
        if (answer.managerID === "") {
          query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.rolesID}, null)`;
        }
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
  }

  // to add a new roles ===================================================================
  function addRoles() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the roles?",
          name: "rolesName",
        },
        {
          type: "input",
          message: "What is the salary for the roles?",
          name: "salaryTotal",
        },
        {
          type: "input",
          message: "In which department should we place this role?",
          name: "departmentID",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.rolesName, answer.salaryTotal, answer.departmentID],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  }

  //ADD DEPARTMENT==============================================================
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department you would like to add?",
          name: "departmentName",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO department (department_name) VALUES (?)",
          [answer.departmentName],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  }
  function updateEmployee() {
    // create employee and role array
    let employeeArray = [];
    let roleArray = [];
    console.log(updatEmployeeArray);
    connection.query("SELECT id,title FROM roles ORDER BY title ASC", function (
      err,
      res
    ) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      // roleArray = res;
      //loop through res. and for each object in the res array create a new object {name: object.title, value, object.id} and add it to
      for (i = 0; i < res.length; i++) {
        roleArray.push(res[i].title);
      }
      connection.query(
        "SELECT employee.id, concat(employee.first_name, employee.last_name) AS Employee FROM employee ORDER BY employee ASC",
        function (err, res) {
          if (err) throw err;
          console.log(JSON.stringify(res));
        }
      );
      for (i = 0; i < res.length; i++) {
        employeeArray.push(res[i].employee);
      }
      inquirer
        .prompt([
          {
            name: "role",
            type: "list",
            message: "What is this new role?",
            choices: roleArray,
          },
          {
            name: "employee",
            type: "list",
            message: "What employee would you like to edit?",
            choices: employeeArray,
          },
        ])
        .then((answer) => {
          connection.query(
            `UPDATE employee SET roles_id = ${answer.role} WHERE id = ${answer.employee}`
          );
        });
    });
  }
}
// UPDATE
// function updateEmployee() {
//   console.log("Updating Employees\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ? ",
//     [
//       {
//         quantity: 100,
//       },
//       {
//         flavor: "Rocky Road",
//       },
//     ],
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );
// }
