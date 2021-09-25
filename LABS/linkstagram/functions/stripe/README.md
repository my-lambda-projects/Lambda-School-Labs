Create Stripe customers and charge them on RTDB write
This sample shows how to create Stripe customers and charge them when the Realtime Database is written to.

Further reading:

Stripe Node API: https://stripe.com/docs/api/node
Firebase SDK: https://firebase.google.com/docs/functions



To test this integration: 


Install dependencies locally by running: cd functions; npm install; cd -
Add your Stripe API Secret Key to firebase config:
firebase functions:config:set stripe.token=<YOUR STRIPE API KEY>
Optional: change your default currency firebase functions:config:set stripe.currency=GBP
Pass your Stripe publishable key to the Stripe.setPublishableKey call in public/index.html
Deploy your project using firebase deploy
Test your Stripe integration by viewing your deployed site firebase open hosting:site  (we are already deployed, just need to add stripe api key)