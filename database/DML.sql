-- bookings.html data manipulation code

-- Display all Bookings adjusting FK relationship for rental ID name
SELECT booking_id, number_of_guests, Rentals.rental_name as rental_name, check_in_date, check_out_date, total_cost 
FROM Bookings 
INNER JOIN Rentals
ON Bookings.rental_id = Rentals.rental_id;

-- Select queries for dropdowns
SELECT booking_id FROM Bookings
SELECT rental_name FROM Rentals

    -- insert booking
INSERT INTO `Bookings` (`number_of_guests`, `rental_id`, `check_in_date`, `check_out_date`, `total_cost`)
VALUES (
    :number_of_guests_input,
    :rental_id_input,
    :check_in_date_input,
    :check_out_date_input,
    :total_cost_input
);

    -- delete bookings
DELETE FROM `Bookings` WHERE `Booking_id` = :booking_id_input;

-- Search bookings by id
SELECT * FROM Bookings WHERE id = :booking_id_input;
---------------------------------------------------------------------------------------------------------------

-- employees.html data manipulation code

-- Display all employees
SELECT * FROM Employees;

-- Select queries for dropdowns
SELECT employee_id FROM Employees

    -- insert new employee
INSERT INTO `Employees` (`first_name`, `last_name`, `email`, `phone`)
VALUES (
    :first_name_input,
    :last_name_input,
    :email_input,
    :phone_input
);
    -- update employee 
UPDATE `Employees` SET `first_name` = :first_name_input, `last_name_input` = :last_name_input,`email` = :email_input,
`phone` = :phone_input WHERE `employee_id` = :employee_id_input;

    -- delete employee
DELETE FROM `Employees` WHERE `employee_id` = :employee_id_input;

---------------------------------------------------------------------------------------------------------------

-- guests.html data manipulation code

-- Display all guests
SELECT * FROM Guests;

-- Select queries for dropdowns
SELECT guest_id FROM Guests

    -- insert new guest
INSERT INTO `Guests` (`first_name`, `last_name`, `email`, `phone`, `address`)
VALUES (
    :first_name_input,
    :last_name_input,
    :email_input,
    :phone_input
    :address_input
);

    -- update guest
UPDATE `Guests` SET `first._name` = :first_name_input, `last_name_input` = :last_name_input,`email` = :email_input,
`phone` = :phone_input, `address` = :address_input WHERE `employee_id` = :employee_id_input;

    -- delete guest
DELETE FROM `Guests` WHERE `employee_id` = :employee_id_input;

---------------------------------------------------------------------------------------------------------------

-- rentals.html data manipulation code
-- Display all rentals with FK relationships
SELECT rental_id, rental_name, Rental_Types.rental_type_name as rental_type_name, CONCAT(Employees.first_name, ' ', Employees.last_name) as name from Rentals 
        INNER JOIN Rental_Types 
        ON Rentals.rental_Type_id = Rental_Types.rental_type_id 
        INNER JOIN Employees 
        ON Rentals.employee_id = Employees.employee_id;

-- Select queries for dropdowns
SELECT rental_id FROM Rentals
SELECT rental_type_name FROM Rental_Types
SELECT first_name, last_name FROM Employees

    -- insert new rental
INSERT INTO `Rentals` ( `rental_name`, `rental_type_id`, `employee_id`)
VALUES (
    :rental_name_input,
    :rental_type_id_dropdown_input,
    :employee_id_dropdown_input,
);
    -- update rental
UPDATE `Rentals` SET `rental_name` = :rental_name_input, `rental_type_id` = :rental_type_id_dropdown_input, `employee_id` = :employee_id_dropdown_input;

    -- delete rental
DELETE FROM `Rentals` WHERE `rental_id` = :rental_id_input;
---------------------------------------------------------------------------------------------------------------
-- rental_types.html data manipulation code

-- Display all rental types
SELECT * FROM Rental_types;

-- Select queries for dropdowns
SELECT rental_type_id FROM Rentals_Types
SELECT availability FROM Rental_Types


 -- insert new rental type
INSERT INTO `Rental_Types` ( `rental_name`, `rental_type_id`, `employee_id`)
VALUES (
    :rental_type_name_input,
    :year_round_dropdown_input,
    :occupancy_input,
    :cost_per_night_input
);
    -- delete rental types
DELETE FROM `Rental_Types` WHERE `rental_type_id` = :rental_type_id_input;

---------------------------------------------------------------------------------------------------------------
-- bookings_guests.html data manipulation code

-- Display all from Bookings_Guests
SELECT * FROM Bookings_Guests;

    -- insert into bookings_guests
INSERT INTO `Bookings_Guests` (`guest_id`, `booking_id`)
VALUES (
    :guest_id_input,
    :booking_id_input,
);
    -- delete from Bookings_Guests
DELETE FROM `Bookings_Guests WHERE `booking_id` = :booking_id_input AND `guest_id` = :guest_id_input