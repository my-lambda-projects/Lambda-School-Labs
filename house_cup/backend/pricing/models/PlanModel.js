const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlanSchema = Schema({
  name: String,
  allowedTeachers: {
    type: Number,
    required: true,
  },
  allowedHouses: {
    type: Number,
    required: true,
  },
  schools: [{
    type: Schema.Types.ObjectId,
    ref: 'School',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Plan', PlanSchema);
