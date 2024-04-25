const mongoose = require('mongoose');

// Feedback Schema

const feedbackSchema = new mongoose.Schema({
  performanceReviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'PerformanceReview', required: true },
  feedbackText: { type: String, required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
