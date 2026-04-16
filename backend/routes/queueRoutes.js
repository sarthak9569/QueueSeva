const express = require('express');
const router = express.Router();
const {
  generateToken,
  getLiveQueue,
  getTokenHistory,
} = require('../controllers/queueController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateToken);
router.get('/live', protect, getLiveQueue);
router.get('/history', protect, getTokenHistory);

module.exports = router;
