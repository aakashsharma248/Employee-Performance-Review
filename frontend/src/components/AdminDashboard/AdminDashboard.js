import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  // State variables
  const [employees, setEmployees] = useState([]);
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    email: ''
  });
  const [newPerformanceReview, setNewPerformanceReview] = useState({
    title: '',
    description: '',
    participants: []
  });
  const navigate = useNavigate();

  // Fetch employees and performance reviews on component mount
  useEffect(() => {
    fetchEmployees();
    fetchPerformanceReviews();
  }, []);

  // Function to fetch employees
  const fetchEmployees = () => {
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  };

  // Function to fetch performance reviews
  const fetchPerformanceReviews = () => {
    axios.get('/api/performance-reviews')
      .then(response => {
        setPerformanceReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching performance reviews:', error);
      });
  };

  // Function to handle form submission for adding a new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    axios.post('/api/employees', newEmployee)
      .then(response => {
        fetchEmployees(); // Refresh employee list after adding
        setNewEmployee({
          name: '',
          department: '',
          email: ''
        });
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  };

  // Function to handle form submission for adding a new performance review
  const handleAddPerformanceReview = (e) => {
    e.preventDefault();
    axios.post('/api/performance-reviews', newPerformanceReview)
      .then(response => {
        fetchPerformanceReviews(); // Refresh performance review list after adding
        setNewPerformanceReview({
          title: '',
          description: '',
          participants: []
        });
      })
      .catch(error => {
        console.error('Error adding performance review:', error);
      });
  };

  const LoginAsEmployee = () => {
    console.log('LoginAsAdmin');
    navigate("/");
   }

  return (
    <div className="dashboard-container">
    <button onClick={LoginAsEmployee} className="EmployeeLogin">Login as Employee</button>
    <h2>Admin Dashboard</h2>
  
    {/* Add Employee Form */}
    <div className="form-container">
      <h3>Add Employee</h3>
      <form onSubmit={handleAddEmployee}>
        <div className="input-container">
          <input type="text" placeholder="Name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Department" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} />
        </div>
        <div className="input-container">
          <input type="email" placeholder="Email" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
        </div>
        <div className="button-container">
          <button type="submit">Add Employee</button>
        </div>
      </form>
    </div>
  
    {/* Employee List */}
    <div className="list-container">
      <h3>Employee List</h3>
      <ul>
        {employees.map(employee => (
          <>
              <li key={employee._id}> Employee Title - {employee.name}</li>
              <li key={employee._id}> Employee Department - {employee.department}</li>
              <li>----------------------------------------------------------------------------</li>
          </>
        ))}
      </ul>
    </div>
  
    {/* Add Performance Review Form */}
    <div className="form-container section-container">
      <h3>Add Performance Review</h3>
      <form onSubmit={handleAddPerformanceReview}>
        <div className="input-container">
          <input type="text" placeholder="Title" value={newPerformanceReview.title} onChange={e => setNewPerformanceReview({ ...newPerformanceReview, title: e.target.value })} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Description" value={newPerformanceReview.description} onChange={e => setNewPerformanceReview({ ...newPerformanceReview, description: e.target.value })} />
        </div>
        <div className="button-container">
          <button type="submit">Add Performance Review</button>
        </div>
      </form>
    </div>
  
    {/* Performance Review List */}
    <div className="list-container">
      <h3>Performance Review List</h3>
      <ul>
        {performanceReviews.map(review => (
          <>
          <li key={review._id}> Review Title - {review.title} </li>
          <li key={review._id}> Review Description - {review.description} </li>
          <li>----------------------------------------------------------------------------</li>
          </>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default AdminDashboard;
