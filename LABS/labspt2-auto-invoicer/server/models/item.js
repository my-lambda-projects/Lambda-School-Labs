const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    quantity: {
      type: String,
      required: true
    },
    cost: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Item', itemSchema);
