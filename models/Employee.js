const EmergencyContact = require('./EmergencyContact');
// Define a new Employee model with the Sequelize define() method
module.exports = (sequelize, DataTypes) => {
	const Employee = sequelize.define('Employee', {
		// Define the model's attributes, including the primary key, data types, and constraints
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		full_name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		job_title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		phone_no: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
	});

	Employee.associate = (models) => {
		Employee.hasOne(models.EmergencyContact, {
			foreignKey: 'employee_id',
			onDelete: 'CASCADE',
		});
	};

	return Employee;
};
