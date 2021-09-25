
## Available Scripts

In the frontend project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# API Integration
#### Stripe Integration

<!-- - For sufficing the ability of a user to checkout we chose Stripe’s Checkout integration. Functionally we went with posting a one time charge.
- You first need to set up a Stripe account and set your dashboard to test mode. You utilized ‘react-stripe-checkout’ and ‘axios’ to run the functionality.
- Next we created a functional component called stripeBtn.js that when clicked will open up the Stripe’s checkout modal.
- Within this class we create a variable to hold pur publishable key which is obtained from your Stripe dashboard.
- Our component returns a StripeCheckout element that comes ‘react-stripe-checkout’ with it’s props passed to customize the modal and other transactions details.
- The onToken function sends our card info to Stripe and returns a token object. It further also send the token and the amount to the backend in the body with an axios request to finish the transaction.
- We lastly import the component into our App.js -->


- Stripe's checkout option has been implemented with a one time charge option.
- Axios and `react-stripe-checkout` have been implemented but currently requires a Stripe account set to test mode to demonstrate functionality
- `StripeBtn` opens a Stripe Payment modal when clicked
  - within `StripeBtn` there is a variable that holds a publishable key, obtained from the Stripe dashboard
-

# Jurgens Notes

#### Bread Crumbs

- Utilizing React’s Router api is the most obvious and straightforward approach to Breadcrumbs.
- Create a Nav as a container component to encapsulate the the ensuring breadcrumbs.
- Functionally render the props based on the amount of items to be passed through.
- Create a presentational component that will consume predefined routes from an array and render them with the corresponding route. Wrap your routes in a switch case in the event there is no match.
- Export your Breadcrumbs class and make sure to wrap the <App/> component with <Router/> tags for DOM rendering.