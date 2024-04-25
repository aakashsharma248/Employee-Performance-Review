const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee } = require('../controllers/employeeController');
  const {
    submitFeedback } = require('../controllers/feedbackController');
    const {
  getPerformanceReviews,
  addPerformanceReview,
  updatePerformanceReview,
  deletePerformanceReview} = require('../controllers/performanceReviewController');
  

// Employee routes
router.get('/employees', getEmployees);
router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

// Performance review routes
router.get('/performance-reviews', getPerformanceReviews);
router.post('/performance-reviews', addPerformanceReview);
router.put('/performance-reviews/:id', updatePerformanceReview);
router.delete('/performance-reviews/:id', deletePerformanceReview);

// Feedback route
router.post('/performance-reviews/:id/feedback', submitFeedback);

module.exports = router;
