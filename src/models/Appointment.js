const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient querying
appointmentSchema.index({ doctor: 1, date: 1 });
appointmentSchema.index({ patient: 1, date: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment; 