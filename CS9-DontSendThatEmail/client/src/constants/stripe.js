const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPEPUBLISHABLE
    : "pk_test_S52mTqWpHh8UIY5D4EDpVGmS";

export default STRIPE_PUBLISHABLE;
