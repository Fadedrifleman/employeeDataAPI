# Employee Management System API

This is a Node.js API for managing employees and their emergency contacts.

## Getting Started

1. Clone the repository: `git clone https://github.com/fadedrifleman/employeeDataApi.git`
2. Install the dependencies: `npm install`
3. Set up the database:
   - Create a MySQL database called `employee_management_system`
   - Rename `config/config.example.json` to `config/config.json` and edit it with your database credentials
   - Run migrations: `npx sequelize-cli db:migrate`
4. Start the server: `npm start`

## Data Model

The following is the data model for the Employee Management System:
```
- Employee
  - id (integer)
  - first_name (string)
  - last_name (string)
  - email (string)
  - phone (string)
  - address (string)
  - state (string)
  - city (string)

- Emergency Contact
  - id (integer)
  - employee_id (integer)
  - primary_contact_name (string)
  - primary_contact_phone (string)
  - primary_contact_relationship (string)
  - secondary_contact_name (string)
  - secondary_contact_phone (string)
  - secondary_contact_relationship (string)
```

## Route

- `/api/v1`

## API Endpoints

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get an employee by ID
- `POST /employees` - Create a new employee
- `PUT /employees/:id` - Update an employee by ID
- `DELETE /employees/:id` - Delete an employee by ID

## Usage

### Create Employee

To create a new employee, send a POST request to `api/v1/employee` with the following JSON payload:

`json`
```
{
  "employee": {
    "full_name": "John"
    "email": "johndoe@example.com",
    "phone_no": "555-555-5555",
    "job_title": "Software Engineer",
    "address":"31 St., Mary Town",
    "city":"Tellahese",
    "state":"TX",
  },
  "emergencyContact": {
    "primary_contact_name": "Jane Doe",
    "primary_contact_phone": "555-555-5555",
    "primary_contact_relationship": "Spouse",
    "secondary_contact_name": "Bob Smith",
    "secondary_contact_phone": "555-555-5555",
    "secondary_contact_relationship": "Friend"
  }
}
```

### Get Employee

To get an employee by ID, send a GET request to `api/v1/employee/:id`. The response will contain the employee object and their emergency contact object, if it exists.

### Update Employee

To update an employee, send a PUT request to `api/v1/employee/:id` with the fields you want to update in the request body. For example, to update an employee's phone number, send the following JSON payload:

`json`
```
{
  "employee": {
    "phone": "555-555-5555"
  }
}
```

You can also update the employee's emergency contact by including the `emergencyContact` field in the request body. For example, to update the emergency contact's phone number, send the following JSON payload:

`json`
```
{
  "emergencyContact": {
    "primary_contact_phone": "555-555-5555"
  }
}
```

Or you can update both employee and his emergencyContact at once, by including both `employee` and `emergencyContact` fields in the request body. For example,to update an employee's phone number andthe emergency contact's phone number, send the following json payload:

### Delete Employee

To delete an employee, send a DELETE request to `api/v1/employee/:id`. This will also delete the employee's emergency contact.

## Technologies Used

- Node.js
- Express
- Sequelize
- MySQL