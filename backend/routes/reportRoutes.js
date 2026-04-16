const express = require('express');
const router = express.Router();
const {
  uploadReport,
  getReports,
  deleteReport,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('file'), uploadReport);
router.get('/', protect, getReports);
router.delete('/:id', protect, deleteReport);

module.exports = router;
