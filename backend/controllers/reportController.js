const Report = require('../models/Report');

// @desc    Upload a new report/prescription
// @route   POST /api/reports/upload
// @access  Private
const uploadReport = async (req, res) => {
  const { department } = req.body;

  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const report = await Report.create({
    user: req.user._id,
    fileName: req.file.originalname,
    fileUrl: `/uploads/${req.file.filename}`,
    fileType: req.file.mimetype,
    department: department || 'General',
  });

  if (report) {
    res.status(201).json(report);
  } else {
    res.status(400).json({ message: 'Invalid report data' });
  }
};

// @desc    Get all reports for user
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).sort({ uploadDate: -1 });
  res.json(reports);
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
// @access  Private
const deleteReport = async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    if (report.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    await Report.deleteOne({ _id: report._id });
    res.json({ message: 'Report removed' });
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
};

module.exports = {
  uploadReport,
  getReports,
  deleteReport,
};
