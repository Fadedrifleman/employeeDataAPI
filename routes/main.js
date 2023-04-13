// Import the required modules
const express = require('express');
const {
	createEmployee,
	listEmployees,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require('../controllers/employees');

const router = express.Router(); // Initializing new router object

router // /employee/:id routes
	.route('/employee/:id')
	.put(updateEmployee) // Update Employee
	.delete(deleteEmployee) // Delete Employee
	.get(getEmployee); // Get Employee detail

router //  /employee routes
	.route('/employee')
	.post(createEmployee) // Create Employee with multiple contact details (Relationship mapping)
	.get(listEmployees); //List Employee (with pagination)


module.exports = router; // Export the router
