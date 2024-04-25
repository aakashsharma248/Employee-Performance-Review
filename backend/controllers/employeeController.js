const Employee = require('../models/Employee');

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    department: req.body.department,
    email: req.body.email
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (req.body.name != null) {
      employee.name = req.body.name;
    }
    if (req.body.department != null) {
      employee.department = req.body.department;
    }
    if (req.body.email != null) {
      employee.email = req.body.email;
    }

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
