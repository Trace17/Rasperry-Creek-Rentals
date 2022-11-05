// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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
        let query1;
        if (req.query.booking_id === undefined)
        { 
            query1 = "SELECT booking_id, number_of_guests, Rentals.rental_name as rental_name, check_in_date, check_out_date, total_cost \
        FROM Bookings \
        INNER JOIN Rentals \
        ON Bookings.rental_id = Rentals.rental_id;";
        }
        else 
        {
            query1 = `SELECT booking_id, number_of_guests, Rentals.rental_name as rental_name, check_in_date, check_out_date, total_cost \
            FROM Bookings \
            INNER JOIN Rentals \
            ON Bookings.rental_id = Rentals.rental_id \
            WHERE booking_id LIKE "${req.query.booking_id}%";`;
        }

        let query2 = "SELECT * FROM Rentals"
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let bookings = rows
            db.pool.query(query2, function(error, rows, fields){    // Execute the query
                let rentals = rows
                res.render('bookings', {data: bookings, rentals: rentals});                  // Render the bookings.hbs file, and also send the renderer
            })                  // Render the bookings.hbs file, and also send the renderer
        })    
    });    

app.get('/employees', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT * FROM Employees;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});                  // Render the employees.hbs file, and also send the renderer
        })      
    });    

app.get('/guests', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT * FROM Guests;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('guests', {data: rows});                  // Render the guests.hbs file, and also send the renderer
        })                                            
    });    

app.get('/rental_types', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT * FROM Rental_Types;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('rental_types', {data: rows});                  // Render the rental_types.hbs file, and also send the renderer
        })     
    });  
    


/* Rentals Data manipulation */
// Display data to rentals table
app.get('/rentals', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT rental_id, rental_name, Rental_Types.rental_type_name as rental_type_name, CONCAT(Employees.first_name, ' ', Employees.last_name) as name from Rentals \
        INNER JOIN Rental_Types \
        ON Rentals.rental_Type_id = Rental_Types.rental_type_id \
        INNER JOIN Employees \
        ON Rentals.employee_id = Employees.employee_id \
        ORDER BY rental_id ASC;";

        let query2 = "SELECT * FROM Rental_Types;";

        let query3 = "SELECT employee_id, CONCAT(first_name, ' ', last_name) as name FROM Employees"
        
        db.pool.query(query1, function(error, rows, fields){  
            let rentals = rows;  // Execute the query
            db.pool.query(query2, function(error, rows, fields){    // Execute the query
                let rental_types = rows;
                db.pool.query(query3, function(error, rows, fields){    // Execute the query
                    let employees = rows;
                    res.render('rentals', {data: rentals, rental_types: rental_types, employees: employees});                  // Render the rentals.hbs file, and also send the renderer
                })                 // Render the rentals.hbs file, and also send the renderer
            })               // Render the rentals.hbs file, and also send the renderer
        })    
    });    


/* Allows adding of new rental */
app.post('/add-rental-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values (Does not work correctly) *************

    let rental_name = data['input_rental_name'];
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


/* Allows adding of new guest */
app.post('/add-guest-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values (Does not work correctly) *************

    let guest_first_name = data['input_guest_first_name'];
    if (guest_first_name.length === 0)
    {
        guest_first_name = "NULL"
    }

    let guest_last_name = data['input_guest_last_name'];
    if (guest_last_name.length === 0)
    {
        guest_last_name = "NULL"
    }

    let guest_email = data['input_guest_email'];
    if (guest_email.length === 0)
    {
        guest_email = "NULL"
    }
    
    let guest_phone = data['input_guest_phone'];
    if (guest_phone.length === 0)
    {
        guest_phone = "NULL"
    }

    let guest_address = data['input_guest_address'];
    if (guest_address.length === 0)
    {
        guest_address = "NULL"
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Guests (first_name, last_name, email, phone, address) VALUES ("${guest_first_name}", "${guest_last_name}", "${guest_email}", "${guest_phone}", "${guest_address}")`;
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
            res.redirect('guests');
        }
    })
})


/* Allows the addition of new rental types */
app.post('/add-rental-types-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values (Does not work correctly) *************

    let rental_type_name = data['input_rental_type_name'];
    if (rental_type_name.length === 0)
    {
        rental_type_name = "NULL"
    }

    let availability = data['input_availability'];
    if (availability.length === 0)
    {
        availability = "NULL"
    }

    let occupancy = parseInt(data['input_occupancy']);
    if (isNaN(occupancy))
    {
        occupancy = 'NULL'
    }
    
    let cost_per_night = parseInt(data['input_cost_per_night']);
    if (isNaN(cost_per_night))
    {
        cost_per_night = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Rental_Types (rental_type_name, availability, occupancy, cost_per_night) VALUES ("${rental_type_name}", "${availability}", ${occupancy}, ${cost_per_night})`;
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
            res.redirect('rental_types');
        }
    })
})



/* Allows adding of new employee */
app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values (Does not work correctly) *************

    let employee_first_name = data['input_employee_first_name'];
    if (employee_first_name.length === 0)
    {
        employee_first_name = "NULL"
    }

    let employee_last_name = data['input_employee_last_name'];
    if (employee_last_name.length === 0)
    {
        employee_last_name = "NULL"
    }

    let employee_email = data['input_employee_email'];
    if (employee_email.length === 0)
    {
        employee_email = "NULL"
    }
    
    let employee_phone = data['input_employee_phone'];
    if (employee_phone.length === 0)
    {
        employee_phone = "NULL"
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (first_name, last_name, email, phone) VALUES ("${employee_first_name}", "${employee_last_name}", "${employee_email}", "${employee_phone}")`;
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
            res.redirect('employees');
        }
    })
})

/* Allows the addition of a new booking  --------- Booking Date not working*/
app.post('/add-booking-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values (Does not work correctly) *************

    let number_of_guests = parseInt(data['input_number_of_guests']);
    if (isNaN(number_of_guests))
    {
        number_of_guests = 'NULL'
    }

    let rental = parseInt(data['input_rental']);
    if (isNaN(rental))
    {
        rental = 'NULL'
    }

    let total_cost = parseInt(data['input_total_cost']);
    if (isNaN(total_cost))
    {
        total_cost = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Bookings (number_of_guests, rental_id, check_in_date, check_out_date, total_cost) VALUES (${number_of_guests}, ${rental}, "${data['check_in_date']}", "${data['check_out_date']}", ${total_cost})`;
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
            res.redirect('bookings');
        }
    })
})


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});