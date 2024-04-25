const mongoose = require('mongoose');

// performanceReview Schema

const performanceReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  feedbackSubmitted: { type: Boolean, default: false }
});

const PerformanceReview = mongoose.model('PerformanceReview', performanceReviewSchema);

module.exports = PerformanceReview;
