const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema(
  {
    createdBy: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    terms: {
      type: String
    },
    date: {
      type: String,
      required: true
    },
    dueDate: {
      type: String,
      required: true
    },
    company: {
      _id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      address1: {
        type: String,
        required: true
      },
      address2: {
        type: String
      },
      zipCode: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      }
    },
    customer: {
      _id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      address1: {
        type: String,
        required: true
      },
      address2: {
        type: String
      },
      zipCode: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      }
    },
    items: [
      {
        _id: {
          type: String,
          required: true
        },
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
      }
    ],
    subtotal: {
      type: String,
      required: true
    },
    discount: {
      type: String
    },
    tax: {
      type: String
    },
    shipping: {
      type: String
    },
    total: {
      type: String,
      required: true
    },
    balance: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    paid: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('Invoice', invoiceSchema);
