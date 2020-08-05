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
  database: "ice_creamDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  //look at then , .then create dept, put in dept name from inq.
  createProduct();
});


// 3 helpers for creating everything
function createDept(deptName) {
  console.log("Inserting a new Dept...\n");
  var query = connection.query(
    // indesert in dept set, name, and other params, DB will handle the IDs, ? is for 32-34 {}
    "INSERT INTO departments SET ?",
    {
      name: deptName,
      // create more lines where the name exactly matches the column name to populate columns
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      // updateDept();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateDept() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ? ",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}


// to show all depts
function readDepts() {
  console.log("Selecting all depts...\n");
  connection.query("SELECT * FROM departments",
  function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}
