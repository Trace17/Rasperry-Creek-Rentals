SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS Guests;
DROP TABLE IF EXISTS Bookings_Guests;
DROP TABLE IF EXISTS Rentals;
DROP TABLE IF EXISTS Rental_Types;
DROP TABLE IF EXISTS Employees;


CREATE TABLE `Guests` (
  `guest_id` int(11) AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`guest_id`)
);

CREATE TABLE `Employees` (
  `employee_id` int(11) AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_id`)
);

CREATE TABLE `Rental_Types` (
  `rental_type_id` int(11) AUTO_INCREMENT,
  `rental_type_name` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL,
  `occupancy` int(11) NOT NULL,
  `cost_per_night` int(11) NOT NULL,
  PRIMARY KEY (`rental_type_id`)
);

CREATE TABLE `Rentals` (
  `rental_id` int(11) AUTO_INCREMENT,
  `rental_name` varchar(255) NOT NULL,
  `rental_type_id` int (11) NOT NULL,
  `employee_id` int(11),
  PRIMARY KEY (`rental_id`),
  FOREIGN KEY (`rental_type_id`) REFERENCES `Rental_Types`(`rental_type_id`) ON DELETE CASCADE,
  FOREIGN KEY (`employee_id`) REFERENCES `Employees`(`employee_id`) ON DELETE SET NULL
);

CREATE TABLE `Bookings` (
  `booking_id` int(11) AUTO_INCREMENT,
  `number_of_guests` int (11) NOT NULL,
  `rental_id` int(11) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `total_cost` decimal NOT NULL,
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (`rental_id`) REFERENCES `Rentals`(`rental_id`) ON DELETE NO ACTION
);

CREATE TABLE `Bookings_Guests` (
  `guest_id` int(11),
  `booking_id` int(11),
  FOREIGN KEY (`guest_id`) REFERENCES `Guests`(`guest_id`) ON DELETE CASCADE,
  FOREIGN KEY (`booking_id`) REFERENCES `Bookings`(`booking_id`) ON DELETE CASCADE
);

INSERT INTO `Guests` (`first_name`, `last_name`, `email`, `phone`, `address`
) VALUES 
(
    "Sara",
    "Bar",
    "smbar@hello.com",
    "7609879299",
    "700 Hedges Rd Encinitas, CA USA 92101"
),
(	"Miguel",
	"Lopez",
    "mlopez94@hello.com",
    "7602995493",
    "2338 West F street Oceanside, CA USA 92011"
),
(	"Brandon",
	"Miller",
    "bmiller26@hello.com",
    "7609923434",
    "7763 Venerie Rd Carlsbad, CA USA 92011"
),
(	"Cassie",
	"Mason",
    "cassam@hello.com",
    "2318152366",
    "3923 Cherry St Vancouver, WA USA 98607"
),
(	"Perry",
	"Mason",
    "pmason@hello.com",
    "2314573246",
    "3923 Cherry St Vancouver, WA USA 98607"
);

INSERT INTO `Rental_Types` ( `rental_type_name`, `availability`, `occupancy`, `cost_per_night`
) VALUES 
(
    "Yurt",
    "Year Round",
    4,
    80
),
(
    "Tiny Home",
    "Year Round",
    5,
    100
),
(
    "Bus",
    "Year Round",
    3,
    65
),
(
    "Campsite",
    "Summer",
    6,
    15
);

INSERT INTO `Employees` (`first_name`, `last_name`, `email`, `phone`
) VALUES
(
    "Kurt",
    "Johnson",
    "kjohnson@hello.com",
    "5028746639"
),
(	"Samantha",
	"Williams",
    "sammy432@hello.com",
    "4435532789"
),
(
    "Val",
    "Michaels",
    "vmichaels@hello.com",
    "7554325647"
);
    

INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Spruce",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Yurt')),
    (select employee_id from `Employees` where (first_name = 'Kurt' and last_name = 'Johnson')));
    
INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Pine",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Yurt')),
    (select employee_id from `Employees` where (first_name = 'Val' and last_name = 'Michaels')));
    
INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Cedar",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Yurt')),
    (select employee_id from `Employees` where (first_name = 'Kurt' and last_name = 'Johnson')));
    
INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES (
    "Blueberry Cottage",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Tiny Home')),
    (select employee_id from `Employees` where (first_name = 'Samantha' and last_name = 'Williams')));

INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Strawberry Cottage",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Tiny Home')),
    (select employee_id from `Employees` where (first_name = 'Samantha' and last_name = 'Williams'))
);

INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Beaver Bus",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Bus')),
    (select employee_id from `Employees` where (first_name = 'Kurt' and last_name = 'Johnson'))
);

INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Camp Elk",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Campsite')),
    (select employee_id from `Employees` where (first_name = 'Val' and last_name = 'Michaels'))
);

INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Camp Bison",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Campsite')),
    (select employee_id from `Employees` where (first_name = 'Val' and last_name = 'Michaels'))
);

INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`
) VALUES 
(
    "Camp Grizzly",
    (select rental_type_id from `Rental_Types` where (rental_type_name = 'Campsite')),
    (select employee_id from `Employees` where (first_name = 'Val' and last_name = 'Michaels'))
);

INSERT INTO `Bookings` (`number_of_guests`, `rental_id`, `check_in_date`, `check_out_date`, `total_cost`
) VALUES
(	4,
	(select rental_id from `Rentals` where (rental_name = 'Spruce')),
    '2020-11-19',
    '2020-11-27',
    640),
(	4,
	(select rental_id from `Rentals` where (rental_name = 'Cedar')),
    '2020-06-15',
    '2020-06-19',
    320),
(	6,
	(select rental_id from `Rentals` where (rental_name = 'Camp Grizzly')),
    '2020-07-03',
    '2020-07-09',
    90);

INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES(
(select guest_id from `Guests` where (first_name = 'Sara' and last_name = 'Bar')),
(select booking_id from `Bookings` where (rental_id = (select rental_id from `Rentals` where (rental_name = 'Spruce')) and check_in_date = '2020-11-19')));

INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES(
(select guest_id from `Guests` where (first_name = 'Miguel' and last_name = 'Lopez')),
(select booking_id from `Bookings` where (rental_id = (select rental_id from `Rentals` where (rental_name = 'Spruce')) and check_in_date = '2020-11-19')));

INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES(
(select guest_id from `Guests` where (first_name = 'Brandon' and last_name = 'Miller')),
(select booking_id from `Bookings` where (rental_id = (select rental_id from `Rentals` where (rental_name = 'Cedar')) and check_in_date = '2020-06-15')));

INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES(
(select guest_id from `Guests` where (first_name = 'Sara' and last_name = 'Bar')),
(select booking_id from `Bookings` where (rental_id = (select rental_id from `Rentals` where (rental_name = 'Camp Grizzly')) and check_in_date = '2020-07-03')));

INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES(
(select guest_id from `Guests` where (first_name = 'Perry' and last_name = 'Mason')),
(select booking_id from `Bookings` where (rental_id = (select rental_id from `Rentals` where (rental_name = 'Camp Grizzly')) and check_in_date = '2020-07-03')));

INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES(
(select guest_id from `Guests` where (first_name = 'Cassie' and last_name = 'Mason')),
(select booking_id from `Bookings` where (rental_id = (select rental_id from `Rentals` where (rental_name = 'Camp Grizzly')) and check_in_date = '2020-07-03')));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;