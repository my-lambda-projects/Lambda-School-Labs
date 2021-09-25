.mode column
.header on

.tables

.schema

SELECT * FROM shiftapp_employer;

SELECT * FROM shiftapp_employee;

SELECT * FROM auth_user;

SELECT first_name, last_name FROM shiftapp_employee, auth_user 
 WHERE shiftapp_employee.user_id = auth_user.id; 

