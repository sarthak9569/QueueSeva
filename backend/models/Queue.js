const mongoose = require('mongoose');

const queueSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    department: {
      type: String,
      required: true,
      enum: [
        'General OPD',
        'Cardiology',
        'Orthopaedics',
        'Neurology',
        'Paediatrics',
        'Dermatology',
        'ENT',
        'Ophthalmology',
      ],
    },
    tokenNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['waiting', 'completed', 'cancelled', 'expired', 'archived'],
      default: 'waiting',
    },
    scheduledDate: {
      type: Date,
      required: true,
      default: () => new Date().setHours(0, 0, 0, 0),
    },
    estimatedWaitMinutes: {
      type: Number,
      required: true,
      default: 15,
    },
    estimatedArrivalTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for optimized queue management and auto-expiry cleanup
queueSchema.index({ status: 1, scheduledDate: 1, createdAt: 1 });

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;
