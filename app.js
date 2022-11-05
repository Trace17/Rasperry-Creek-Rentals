// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT        = 9347;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.





/*
    ROUTES
*/

//Home page display 
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('index');                    //Render the  index.hs
    });                                         // requesting the web site.


//Bookings_Guests display
app.get('/bookings_guests', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT  CONCAT(Guests.first_name, ' ', Guests.last_name) as name, Bookings.booking_id, Bookings.number_of_guests as number_of_guests, Rentals.rental_name as rental_name, Bookings.check_in_date as check_in_date, Bookings.check_out_date as check_out_date from Bookings_Guests \
        INNER JOIN Bookings \
        ON Bookings.booking_id = Bookings_Guests.booking_id \
        INNER JOIN Rentals \
        ON Rentals.rental_id = Bookings.rental_id \
        INNER JOIN Guests \
        ON Bookings_Guests.guest_id = Guests.guest_id \
        ORDER BY booking_id ASC;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('bookings_guests', {data: rows});                  // Render the bookings_guests.hbs file, and also send the renderer
        })    
    });  

app.get('/bookings', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query2 = "SELECT booking_id, number_of_guests, Rentals.rental_name as rental_name, check_in_date, check_out_date, total_cost \
        FROM Bookings \
        INNER JOIN Rentals \
        ON Bookings.rental_id = Rentals.rental_id;";
        db.pool.query(query2, function(error, rows, fields){    // Execute the query

            res.render('bookings', {data: rows});                  // Render the bookings.hbs file, and also send the renderer
        })    
    });    

app.get('/employees', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query3 = "SELECT * FROM Employees;";
        db.pool.query(query3, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});                  // Render the employees.hbs file, and also send the renderer
        })      
    });    

app.get('/guests', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query4 = "SELECT * FROM Guests;";
        db.pool.query(query4, function(error, rows, fields){    // Execute the query

            res.render('guests', {data: rows});                  // Render the guests.hbs file, and also send the renderer
        })                                            
    });    

app.get('/rental_types', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query5 = "SELECT * FROM Rental_Types;";
        db.pool.query(query5, function(error, rows, fields){    // Execute the query

            res.render('rental_types', {data: rows});                  // Render the rental_types.hbs file, and also send the renderer
        })     
    });  
    


/* Rentals Data manipulation */
// Display data to rentals table
app.get('/rentals', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query6 = "SELECT rental_id, rental_name, Rental_Types.rental_type_name as rental_type_name, CONCAT(Employees.first_name, ' ', Employees.last_name) as name from Rentals \
        INNER JOIN Rental_Types \
        ON Rentals.rental_Type_id = Rental_Types.rental_type_id \
        INNER JOIN Employees \
        ON Rentals.employee_id = Employees.employee_id \
        ORDER BY rental_id ASC;";
        db.pool.query(query6, function(error, rows, fields){    // Execute the query

            res.render('rentals', {data: rows});                  // Render the rentals.hbs file, and also send the renderer
        })    
    });    

    
/* Allow editing of rentals form */
app.post('/add-rental-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values (Does not work correctly) *************

    let rental_name = parseInt(data['input_rental_name']);
    if (rental_name.length === 0)
    {
        rental_name = "NULL"
    }

    let rental_type_id = parseInt(data['input_rental_type_id']);
    if (isNaN(rental_type_id))
    {
        rental_type_id = 'NULL'
    }

    let employee_id = parseInt(data['input_employee_id']);
    if (isNaN(employee_id))
    {
        employee_id = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Rentals (rental_name, rental_type_id, employee_id) VALUES ("${rental_name}", ${rental_type_id}, ${employee_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('rentals');
        }
    })
})


//

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});