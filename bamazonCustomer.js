//Including node package
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Kuan93017",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // checking connection has been made.
    console.log("connected as id " + connection.threadId);
    showAll();
  

});


function showAll() {
    console.log("Showing All Product!\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        buildTable(res);
    
    })
   
}


function buildTable(item) {
    // instantiate
    var table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Stock']
        , colWidths: [20, 20, 20, 20, 20]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends

    //// item for loop table.push for every item
    for (i = 0; i < item.length; i++) {
        table.push(
            [item[i].id, item[i].product_name, item[i].department_name, item[i].price, item[i].stock_quantity]
        );
    }
    console.log(table.toString());
    purchasing();
}

function purchasing(){
    inquirer.prompt([
        {
            type: "input",
            message: "Input the item ID name to make selection",
            name: "id"

        },
        {
            type: "input",
            message: "Enter quantity you want",
            name: "quantity"
        }
    ]).then(function(res){
        // select from db with this id (you have the id but not the db stock)
        // if the sotck in db is GE input then you can proccess the order
                //process the order: go to db an update the new stock
        // if not tell the user you have not enough and ask if the want other
       // id = res.id;
        connection.query("SELECT * FROM products WHERE id=" + res.id, function(err, data){
 
            if(parseInt(res.quantity) <= parseInt(data[0].stock_quantity)){
                    // console.log("inside the if")

                    //update the db with the new value
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: data[0].stock_quantity - res.quantity
                        },
                        {
                            id: res.id
                        }
                    ], function(err,response){
                        console.log("Total Price: "+ data[0].price*res.quantity);
                        inquirer.prompt([
                            {
                                type: "confirm",
                                message: "Continue shopping?",
                                name: "continueShopping",
                                default: true
                            }
                        ]).then(function(response){
                            //console.log(response);
                            //response is default to be true
                            if(response.continueShopping === true){
                                showAll();
                            }
                            else{
                                console.log("Thank you for shopping with us!")
                            }
                            
                        })
                    }
                    )}
                    else {
                        console.log("Insufficient Quantity\nPlease re-enter the purchase");

                    }
        })
    })
    
}