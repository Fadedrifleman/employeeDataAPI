const { Employee, EmergencyContact } = require('../models');

const createEmployee = async (req, res) => {
	try {
		const {
			full_name,
			job_title,
			phone_no,
			email,
			address,
			city,
			state,
			primary_contact_name,
			primary_contact_phone,
			primary_contact_relationship,
			secondary_contact_name,
			secondary_contact_phone,
			secondary_contact_relationship,
		} = req.body;

		const employee = await Employee.create({
			full_name,
			job_title,
			phone_no,
			email,
			address,
			city,
			state,
		});

		const emergencyContact = await EmergencyContact.create({
			primary_contact_name,
			primary_contact_phone,
			primary_contact_relationship,
			secondary_contact_name,
			secondary_contact_phone,
			secondary_contact_relationship,
			employee_id: employee.id,
		});

		res.status(201).json({
			success: true,
			message: 'Employee created successfully',
			employee,
			emergencyContact,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Error creating employee',
		});
	}
};

const listEmployees = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	try {
		const employees = await Employee.findAndCountAll({
			include: EmergencyContact,
			offset,
			limit,
		});

		res.json({
			total: employees.count,
			page,
			limit,
			employees: employees.rows,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Error fetching employee list',
		});
	}
};

const updateEmployee = async (req, res) => {
	try {
		const { id } = req.params;
		let employee = await Employee.findByPk(id, {
			include: EmergencyContact,
		});
		if (!employee) {
			return res.status(404).json({ error: 'Employee not found' });
		}
		if (req.body.emergencyContact) {
			const emergencyContact = await EmergencyContact.findOne({
				where: { employee_id: id },
			});
			await emergencyContact.update(req.body.emergencyContact);
		}
		if (req.body.employee) {
			await employee.update(req.body.employee);
		}
		employee = await Employee.findByPk(id, {
			include: EmergencyContact,
		});

		return res.json({ success: true, data: employee });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server error' });
	}
};

const deleteEmployee = async (req, res) => {
	try {
		const { id } = req.params;

		// Find the employee and their emergency contact
		const employee = await Employee.findOne({
			where: { id },
			include: [{ model: EmergencyContact }],
		});

		// If employee is not found, return 404 status
		if (!employee) {
			return res.status(404).json({ message: 'Employee not found' });
		}

		// Delete the employee and their emergency contact
		await employee.destroy();

		// Return success message
		return res.status(200).json({
			message: 'Employee and emergency contact deleted successfully',
		});
	} catch (error) {
		// Handle any errors that occurred during the process
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const getEmployee = async (req, res) => {
	const employeeId = req.params.id;

	try {
		// Find the employee by ID
		const employee = await Employee.findByPk(employeeId);

		// Check if the employee exists
		if (!employee) {
			return res.status(404).json({ message: 'Employee not found' });
		}

		// Find the emergency contact for the employee
		const emergencyContact = await EmergencyContact.findOne({
			where: { employee_id: employeeId },
		});

		res.status(200).json({ employee, emergencyContact });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = {
	createEmployee,
	listEmployees,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
