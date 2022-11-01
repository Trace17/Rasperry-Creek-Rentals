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
        res.render('index'); 
    });                                         // requesting the web site.

app.get('/bookings_guests', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('bookings_guests'); 
    });  

app.get('/bookings', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('bookings'); 
    });    

app.get('/employees', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('employees'); 
    });    

app.get('/guests', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('guests'); 
    });    

app.get('/rental_types', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('rental_types'); 
    });  
    
app.get('/rentals', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('rentals'); 
    });    
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});