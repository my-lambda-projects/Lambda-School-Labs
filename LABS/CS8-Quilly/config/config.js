module.exports = {
  port: process.env.PORT || 5000,
  db: process.env.DBURL || 'mongodb://localhost:27017/quilly',
  sessionSecret: process.env.SESSION_SECRET || 'change this',
  corsOptions: {
    origin: process.env.CLIENTURL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
  },
  stripe: {
    secretKey:
      process.env.STRIPE_SECRET_KEY || 'sk_test_QixOiUfMKS32WljW9ThkIi1e',
    defaultPlan: 'default',
    plans: ['default'],
    planData: {
      default: {
        name: 'Default',
        price: 4.99
      }
    }
  },
  CLOUDINARY_SECRET: 'c5dhD7ClXkQ0U06m2SQW6sT1mvg',
};
