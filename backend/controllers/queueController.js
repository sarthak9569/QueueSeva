const Queue = require('../models/Queue');

const EXPIRY_TIME = 60 * 60 * 1000; // 60 minutes in milliseconds
const AVG_CONSULTATION_TIME = 10; // minutes
const ARRIVAL_BUFFER = 10; // minutes

const isExpired = (token) => {
  return (
    token.status === 'waiting' &&
    Date.now() - new Date(token.createdAt).getTime() > EXPIRY_TIME
  );
};

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

  // Check if user already has an active token today
  const existingToken = await Queue.findOne({
    user: req.user._id,
    status: 'waiting',
    scheduledDate: today,
  });

  if (existingToken) {
    res.status(400).json({ 
      message: 'You already have an active token for today. Please cancel it before requesting a new one.',
      token: existingToken 
    });
    return;
  }

  const prefix = department.substring(0, 1).toUpperCase();
  const count = await Queue.countDocuments({ department, scheduledDate: today });
  const tokenNumber = `#${prefix}-${count + 1}`;

  // Estimate wait time based on queue length (legacy, will be de-emphasized in UI)
  const waitingCount = await Queue.countDocuments({ 
    department, 
    status: 'waiting', 
    scheduledDate: today 
  });
  const estimatedWaitMinutes = waitingCount * AVG_CONSULTATION_TIME;
  const estimatedArrivalTime = new Date(Date.now() + estimatedWaitMinutes * 60000);

  const queue = await Queue.create({
    user: req.user._id,
    department,
    tokenNumber,
    estimatedWaitMinutes: estimatedWaitMinutes,
    estimatedArrivalTime,
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
      const expiryThreshold = new Date(Date.now() - EXPIRY_TIME);
      
      const count = await Queue.countDocuments({ 
        department: dept, 
        status: 'waiting', 
        scheduledDate: today,
        createdAt: { $gte: expiryThreshold } // Exclude expired
      });
      
      const currentToken = await Queue.findOne({ 
        department: dept, 
        status: 'waiting', 
        scheduledDate: today,
        createdAt: { $gte: expiryThreshold } // Exclude expired
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
  const expiryThreshold = new Date(Date.now() - EXPIRY_TIME);
  let userToken = await Queue.findOne({ 
    user: req.user._id, 
    status: 'waiting', 
    scheduledDate: today,
    createdAt: { $gte: expiryThreshold } // Only show if not expired
  }).sort({ createdAt: -1 });

  let position = null;
  if (userToken) {
    position = await Queue.countDocuments({
      department: userToken.department,
      status: 'waiting',
      scheduledDate: userToken.scheduledDate,
      createdAt: { $lt: userToken.createdAt, $gte: expiryThreshold } // Exclude expired from position
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

// @desc    Get token history for logged in user (excluding archived)
// @route   GET /api/queue/history
// @access  Private
const getTokenHistory = async (req, res) => {
  const history = await Queue.find({ 
    user: req.user._id, 
    status: { $ne: 'archived' } 
  }).sort({ createdAt: -1 });

  // Virtual status override for soft expiry
  const mappedHistory = history.map(token => {
    if (isExpired(token)) {
      const tokenObj = token.toObject();
      tokenObj.status = 'expired';
      return tokenObj;
    }
    return token;
  });

  res.json(mappedHistory);
};

// @desc    Cancel an active token
// @route   POST /api/queue/cancel
// @access  Private
const cancelToken = async (req, res) => {
  const { tokenId } = req.body;

  const token = await Queue.findOne({ _id: tokenId, user: req.user._id });

  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  token.status = 'cancelled';
  await token.save();

  res.json({ message: 'Token cancelled successfully' });
};

// @desc    Archive a token (remove from history view)
// @route   POST /api/queue/archive
// @access  Private
const archiveToken = async (req, res) => {
  const { tokenId } = req.body;

  const token = await Queue.findOne({ _id: tokenId, user: req.user._id });

  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  token.status = 'archived';
  await token.save();

  res.json({ message: 'Token removed from history' });
};

// @desc    Periodic background cleanup for expired tokens
const startTokenCleanup = () => {
  // Run every 5 minutes
  setInterval(async () => {
    try {
      const now = new Date();
      const expiryThreshold = new Date(now.getTime() - EXPIRY_TIME);

      const result = await Queue.updateMany(
        {
          status: 'waiting',
          createdAt: { $lt: expiryThreshold }
        },
        {
          $set: { status: 'expired' }
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`[Queue Cleanup] Auto-expired ${result.modifiedCount} stale tokens.`);
      }
    } catch (err) {
      console.error('[Queue Cleanup] Error during auto-expiry check:', err);
    }
  }, 5 * 60 * 1000); // 5 minutes
};

module.exports = {
  generateToken,
  getLiveQueue,
  rescheduleToken,
  getTokenHistory,
  cancelToken,
  archiveToken,
  startTokenCleanup,
};
