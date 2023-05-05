-- Insert Customers
INSERT INTO `HomeServices`.`Customers` (`email_address`, `password`, `first_name`, `last_name`) 
VALUES 
('johndoe@example.com', 'password1', 'John', 'Doe'),
('janedoe@example.com', 'password2', 'Jane', 'Doe'),
('bobsmith@example.com', 'password3', 'Bob', 'Smith'),
('alicesmith@example.com', 'password4', 'Alice', 'Smith');

-- Insert services into the table
INSERT INTO `HomeServices`.`Services` (`service`)
VALUES 
  ('Plumbing'),
  ('Cleaning'),
  ('Cooking'),
  ('Electrical'),
  ('Gardening'),
  ('Painting'),
  ('Carpentry'),
  ('Interior Design'),
  ('Event Planning'),
  ('Personal Training');

-- Insert Payment Methods
INSERT INTO `HomeServices`.`PaymentMethods` (payment_method) VALUES ('Cash');
INSERT INTO `HomeServices`.`PaymentMethods` (payment_method) VALUES ('Credit Card');
INSERT INTO `HomeServices`.`PaymentMethods` (payment_method) VALUES ('Debit Card');
INSERT INTO `HomeServices`.`PaymentMethods` (payment_method) VALUES ('Coupon');

-- Plumbing service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Michael', 'Wilson', 1, 'michael.wilson@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Jennifer', 'Davis', 1, 'jennifer.davis@example.com');

-- Cleaning service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Christopher', 'Brown', 2, 'christopher.brown@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Olivia', 'Miller', 2, 'olivia.miller@example.com');

-- Cooking service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Daniel', 'Anderson', 3, 'daniel.anderson@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Emily', 'Garcia', 3, 'emily.garcia@example.com');

-- Electrical service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Matthew', 'Martinez', 4, 'matthew.martinez@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Ava', 'Lopez', 4, 'ava.lopez@example.com');

-- Gardening service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('William', 'Hernandez', 5, 'william.hernandez@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Sophia', 'Taylor', 5, 'sophia.taylor@example.com');

-- Painting service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('James', 'Clark', 6, 'james.clark@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Abigail', 'White', 6, 'abigail.white@example.com');

-- Carpentry service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Benjamin', 'Hall', 7, 'benjamin.hall@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Elizabeth', 'Anderson', 7, 'elizabeth.anderson@example.com');

-- Interior Design service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Alexander', 'Young', 8, 'alexander.young@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Mia', 'Lee', 8, 'mia.lee@example.com');

-- Event Planning service
-- Event Planning service providers
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Daniel', 'Gonzalez', 9, 'daniel.gonzalez@example.com');
INSERT INTO `HomeServices`.`ServiceProviders` (`first_name`, `last_name`, `service_id`, `email_address`) VALUES ('Sofia', 'Harris', 9, 'sofia.harris@example.com');


