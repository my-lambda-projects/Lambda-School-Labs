const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_WyufeHp9FTBavFWAOUqK0icx00EoXVThGt'
  : 'pk_test_WyufeHp9FTBavFWAOUqK0icx00EoXVThGt';

export default STRIPE_PUBLISHABLE;