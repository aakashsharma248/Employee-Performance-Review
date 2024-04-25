const PerformanceReview = require('../models/PerformanceReview');

// Get all performance reviews
exports.getPerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find();
    res.json(performanceReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new performance review
exports.addPerformanceReview = async (req, res) => {
  const performanceReview = new PerformanceReview({
    title: req.body.title,
    description: req.body.description,
    participants: req.body.participants
  });

  try {
    const newPerformanceReview = await performanceReview.save();
    res.status(201).json(newPerformanceReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a performance review
exports.updatePerformanceReview = async (req, res) => {
  try {
    const performanceReview = await PerformanceReview.findById(req.params.id);
    if (performanceReview == null) {
      return res.status(404).json({ message: 'Performance review not found' });
    }

    if (req.body.title != null) {
      performanceReview.title = req.body.title;
    }
    if (req.body.description != null) {
      performanceReview.description = req.body.description;
    }
    if (req.body.participants != null) {
      performanceReview.participants = req.body.participants;
    }

    const updatedPerformanceReview = await performanceReview.save();
    res.json(updatedPerformanceReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a performance review
exports.deletePerformanceReview = async (req, res) => {
  try {
    await PerformanceReview.findByIdAndDelete(req.params.id);
    res.json({ message: 'Performance review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
