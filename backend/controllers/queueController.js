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

  const today = new Date().setHours(0, 0, 0, 0);
  const prefix = department.substring(0, 1).toUpperCase();
  const count = await Queue.countDocuments({ department, scheduledDate: today });
  const tokenNumber = `#${prefix}-${count + 1}`;

  // Estimate wait time based on queue length (legacy, will be de-emphasized in UI)
  const waitingCount = await Queue.countDocuments({ 
    department, 
    status: 'waiting', 
    scheduledDate: today 
  });
  const estimatedWaitMinutes = waitingCount * 5 + 5;

  const queue = await Queue.create({
    user: req.user._id,
    department,
    tokenNumber,
    estimatedWaitMinutes,
    scheduledDate: today,
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
  const today = new Date().setHours(0, 0, 0, 0);
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
      const count = await Queue.countDocuments({ 
        department: dept, 
        status: 'waiting', 
        scheduledDate: today 
      });
      const currentToken = await Queue.findOne({ 
        department: dept, 
        status: 'waiting', 
        scheduledDate: today 
      })
        .sort({ createdAt: 1 })
        .select('tokenNumber');
      
      let load = 'Low';
      if (count > 10) load = 'High';
      else if (count > 5) load = 'Moderate';

      return {
        department: dept,
        count,
        currentToken: currentToken ? currentToken.tokenNumber : 'None',
        load,
      };
    })
  );

  // Global statistics for today
  const completedToday = await Queue.countDocuments({ 
    scheduledDate: today, 
    status: 'completed' 
  });

  // Calculate Avg Consultation Time based on completed tokens today
  const completedTokens = await Queue.find({ 
    status: 'completed', 
    scheduledDate: today 
  });
  
  let avgConsultationTime = 0;
  if (completedTokens.length > 0) {
    const totalTime = completedTokens.reduce((acc, t) => {
      const duration = t.updatedAt - t.createdAt;
      return acc + duration;
    }, 0);
    avgConsultationTime = Math.round(totalTime / completedTokens.length / 60000);
  }

  // Also get the user's current active token for today
  let userToken = await Queue.findOne({ 
    user: req.user._id, 
    status: 'waiting', 
    scheduledDate: today 
  }).sort({ createdAt: -1 });

  let position = null;
  if (userToken) {
    position = await Queue.countDocuments({
      department: userToken.department,
      status: 'waiting',
      scheduledDate: userToken.scheduledDate,
      createdAt: { $lt: userToken.createdAt }
    });
    // Convert Mongoose doc to plain object to attach position
    userToken = userToken.toObject();
    userToken.position = position;
  }

  res.json({ 
    departments: liveQueue, 
    userToken, 
    completedToday, 
    avgConsultationTime: avgConsultationTime || 12 // Default fallback
  });
};

// @desc    Reschedule an existing token to a future date
// @route   POST /api/queue/reschedule
// @access  Private
const rescheduleToken = async (req, res) => {
  const { tokenId, newDate } = req.body;

  if (!tokenId || !newDate) {
    return res.status(400).json({ message: 'Token ID and new date are required' });
  }

  const selectedDate = new Date(newDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    return res.status(400).json({ message: 'Please select a future date' });
  }

  const oldToken = await Queue.findOne({ _id: tokenId, user: req.user._id });
  if (!oldToken) {
    return res.status(404).json({ message: 'Token not found' });
  }

  // 1. Cancel old token
  oldToken.status = 'cancelled';
  await oldToken.save();

  // 2. Generate NEW token for the new date
  const prefix = oldToken.department.substring(0, 1).toUpperCase();
  const count = await Queue.countDocuments({ 
    department: oldToken.department, 
    scheduledDate: selectedDate 
  });
  const tokenNumber = `#${prefix}-${count + 1}`;

  const newToken = await Queue.create({
    user: req.user._id,
    department: oldToken.department,
    tokenNumber,
    scheduledDate: selectedDate,
    status: 'waiting',
    estimatedWaitMinutes: 15 // Standard default
  });

  res.status(201).json({
    message: 'Token rescheduled successfully',
    oldTokenNumber: oldToken.tokenNumber,
    newTokenNumber: newToken.tokenNumber,
    scheduledDate: new Date(selectedDate).toDateString()
  });
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
  rescheduleToken,
  getTokenHistory,
};
