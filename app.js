// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9346;                 // Set a port number at the top so it's easy to change in the future
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
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('index');                    //Render the  index.hs
    });                                         // requesting the web site.

app.get('/bookings_guests', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT booking_id, CONCAT(Guests.first_name, ' ', Guests.last_name) as name from Bookings_Guests \
        INNER JOIN Guests \
        ON Bookings_Guests.guest_id = Guests.guest_id \
        ORDER BY name DESC;";
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
    
app.get('/rentals', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query6 = "SELECT rental_id, rental_name, Rental_Types.rental_type_name as rental_type_name, CONCAT(Employees.first_name, ' ', Employees.last_name) as name from Rentals \
        INNER JOIN Rental_Types \
        ON Rentals.rental_Type_id = Rental_Types.rental_type_id \
        INNER JOIN Employees \
        ON Rentals.employee_id = Employees.employee_id;";
        db.pool.query(query6, function(error, rows, fields){    // Execute the query

            res.render('rentals', {data: rows});                  // Render the rentals.hbs file, and also send the renderer
        })    
    });    
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});