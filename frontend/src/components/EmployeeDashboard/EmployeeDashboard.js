import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EmployeeDashboard.css";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  // State variables
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const navigate = useNavigate();

  // Fetch performance reviews on component mount
  useEffect(() => {
    fetchPerformanceReviews();
  }, []);

  // Function to fetch performance reviews requiring feedback
  const fetchPerformanceReviews = () => {
    axios.get('/api/performance-reviews')
      .then(response => {
        const reviewsNeedingFeedback = response.data.filter(review => !review.feedbackSubmitted);
        setPerformanceReviews(reviewsNeedingFeedback);
      })
      .catch(error => {
        console.error('Error fetching performance reviews:', error);
      });
  };

  // Function to handle form submission for submitting feedback
  const handleSubmitFeedback = (performanceReviewId) => {
    const feedbackText = feedbacks[performanceReviewId];
    axios.post(`/api/performance-reviews/${performanceReviewId}/feedback`, { feedbackText, reviewerId: performanceReviewId })
      .then(response => {
        fetchPerformanceReviews(); // Refresh performance review list after submitting feedback
        setFeedbacks(prevFeedbacks => ({
          ...prevFeedbacks,
          [performanceReviewId]: '' // Reset feedback for this review
        }));
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
      });
  };

  // Function to handle feedback change for a specific review
  const handleFeedbackChange = (performanceReviewId, value) => {
    setFeedbacks(prevFeedbacks => ({
      ...prevFeedbacks,
      [performanceReviewId]: value
    }));
  };

  const LoginAsAdmin = () => {
   console.log('LoginAsAdmin');
   navigate("/admin");
  }

  return (
    <div className="dashboard-container">
    <button onClick={LoginAsAdmin} className="AdminLogin">Login as Admin</button>
    <h2>Employee Dashboard</h2>
    {/* Performance Reviews Requiring Feedback */}
    <div className="review-container">
      <h3>Performance Reviews Requiring Feedback</h3>
      <ul>
        {performanceReviews.map(review => (
          <li key={review._id} className="review-item">
            <p><strong>Title:</strong> {review.title}</p>
            <p><strong>Description:</strong> {review.description}</p>
            <textarea
              placeholder="Enter your feedback"
              value={feedbacks[review._id] || ''}
              onChange={(e) => handleFeedbackChange(review._id, e.target.value)}
            />
            <button onClick={() => handleSubmitFeedback(review._id)}>Submit Feedback</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default EmployeeDashboard;
