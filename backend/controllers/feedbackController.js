const Feedback = require('../models/Feedback');

// Submit feedback for a performance review
exports.submitFeedback = async (req, res) => {
  const feedback = new Feedback({
    performanceReviewId: req.params.id,
    feedbackText: req.body.feedbackText,
    reviewerId: req.body.reviewerId
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
