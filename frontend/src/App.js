import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
