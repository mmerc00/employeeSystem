const inquirer = require("inquirer");

// Call in SQL functions in the .then to populate the db based off of inquirer prompts

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
          viewAllDepartments();
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


//query to join all three tables

//replies 

 function (reply) {
  if (reply.choice === "Add Employee") {
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