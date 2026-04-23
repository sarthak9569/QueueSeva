const express = require('express');
const router = express.Router();
const {
  generateToken,
  getLiveQueue,
  rescheduleToken,
  getTokenHistory,
  cancelToken,
  archiveToken,
} = require('../controllers/queueController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateToken);
router.get('/live', protect, getLiveQueue);
router.post('/reschedule', protect, rescheduleToken);
router.get('/history', protect, getTokenHistory);
router.post('/cancel', protect, cancelToken);
router.post('/archive', protect, archiveToken);

module.exports = router;
