const Queue = require('../models/Queue');

// @desc    Generate a new token for a department
// @route   POST /api/queue/generate
// @access  Private
const generateToken = async (req, res) => {
  const { department } = req.body;

  if (!department) {
    res.status(400).json({ message: 'Please select a department' });
    return;
  }

  // Generate a random token number logic for demo
  // In real system, this would be auto-incrementing per department
  const prefix = department.substring(0, 1).toUpperCase();
  const count = await Queue.countDocuments({ department });
  const tokenNumber = `#${prefix}-${count + 1}`;

  // Estimate wait time based on queue length
  const waitingCount = await Queue.countDocuments({ department, status: 'waiting' });
  const estimatedWaitMinutes = waitingCount * 5 + 5; // 5 mins per person + buffer

  const queue = await Queue.create({
    user: req.user._id,
    department,
    tokenNumber,
    estimatedWaitMinutes,
  });

  if (queue) {
    res.status(201).json(queue);
  } else {
    res.status(400).json({ message: 'Invalid queue data' });
  }
};

// @desc    Get live queue counts for all departments
// @route   GET /api/queue/live
// @access  Private
const getLiveQueue = async (req, res) => {
  const departments = [
    'General OPD',
    'Cardiology',
    'Orthopaedics',
    'Neurology',
    'Paediatrics',
    'Dermatology',
    'ENT',
    'Ophthalmology',
  ];

  const liveQueue = await Promise.all(
    departments.map(async (dept) => {
      const count = await Queue.countDocuments({ department: dept, status: 'waiting' });
      const currentToken = await Queue.findOne({ department: dept, status: 'waiting' })
        .sort({ createdAt: 1 })
        .select('tokenNumber');
      
      let load = 'Low';
      if (count > 10) load = 'High';
      else if (count > 5) load = 'Moderate';
      else if (count > 20) load = 'Critical';

      return {
        department: dept,
        count,
        currentToken: currentToken ? currentToken.tokenNumber : 'None',
        load,
      };
    })
  );

  // Also get the user's current active token if any
  const userToken = await Queue.findOne({ user: req.user._id, status: 'waiting' })
    .sort({ createdAt: -1 });

  res.json({ departments: liveQueue, userToken });
};

// @desc    Get token history for logged in user
// @route   GET /api/queue/history
// @access  Private
const getTokenHistory = async (req, res) => {
  const history = await Queue.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(history);
};

module.exports = {
  generateToken,
  getLiveQueue,
  getTokenHistory,
};
