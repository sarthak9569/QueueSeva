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
      enum: ['waiting', 'completed', 'cancelled'],
      default: 'waiting',
    },
    estimatedWaitMinutes: {
      type: Number,
      required: true,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;
