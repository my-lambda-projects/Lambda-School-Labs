data = {
  clients: {
    username: String,
    email: String,
    phone: Number,
    subscription: String, // "monthly", "perdiem"  -- String instead of Boolean so more subscrption options can be added in the future.  "perdiem" is default.
    invoice: ['ObjectID of Invoice'],
  },
  invoice: {
    number: Number,
    pdf: 'PDF File',
    totalAmount: String, // Number wont be manipulated at all, so no need for it to be a number '$ XXXX.xx'
    phoneFrequency: String,
    emailFrequency: String,
    nextNotice: Date,
    phone: Number,
    email: String,
  },
};
