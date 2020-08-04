//dependecies
//my sql
const mysql = require("mysql");
//inquirer
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeeDB",
});

//connect prompt here:
connection.connect(function(err){
    if (err) throw err;
    //start promt
    addPrompt();
})

//questions
function addPrompt ()
inquirer
.prompt ({
    type: list
})


// * Add departments, roles, employees (addprompt)

//switch case 

// * View departments, roles, employees




// * Update employee roles

//four deparatments - four functions 