import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

// Grabs the Auth0 data from LocalStorage. Need EMAIL
const profile = JSON.parse(localStorage.getItem("profile"));

// Call to BE to request a change in users-table to reflect PAID: True
// The query finds the user by EMAIL and updates paid status
function changeDBStatustoPaid() {
  const body = { email: profile.email }
  axios.put("https://api.backendproxy.com/api/users/paid", body)
  .then(response => {
    if (response.data.rowCount === 0) {
      console.log("This Email is not registered in the DB")
      console.log("Faild to change to status to PAID --> True")
    }
    else{
      console.log("Successfully updated DB status PAID --> True")
    }
  })
  .catch(error => {
    console.log("Error! RIGHT HERE", error)
  })
}
 

const Stripe = () => {
  // const [paid, setPaid] = useState(false)
  // useEffect(() => console.log(paid))
  const publishableKey = "pk_test_kYdeWqAG65rNdCvItFT1ZQ0J";
  
  const onToken = token => {
    const body = {
      amount: 555,
      token: token
    };

    axios
    .post("https://api.backendproxy.com/api/stripe/charge", body)
    .then(response => {
      console.log(response);
      alert("Payment Success");
      // setPaid(true);
      changeDBStatustoPaid()
      //may need to set this up as a promise if changedbstatustopaid doesn't complete before page reloads
      window.location.reload();
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };


  return (
    <StripeCheckout
      
      label="Upgrade Now"
      name="MoveBytes"
      description="Send files without limitations"
      panelLabel="Go Premium" 
      amount={2599} //Amount in cents $5.99
      token={onToken}
      locale="auto"
      zipCode={false}
      billingAddress={false}
      stripeKey={publishableKey} 
     // image="https://yourdomain.tld/images/logo.svg"
    />
  );
};

export default Stripe;


