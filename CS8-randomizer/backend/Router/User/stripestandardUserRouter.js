//STRIPE:
const app = require("express")();
const { SECRET_KEY } = require("./config");
const stripe = require("stripe")(SECRET_KEY);

app.use(require("body-parser").text());

app.route("/").post( async (req, res) => {
  console.log("req.body:", req.body)
  console.log("req.type:", req.type)
  console.log("req.amount:", req.amount)

    try {
      let { status } = await stripe.charges.create({
        amount: "999",
        currency: "usd",
        description: "standard",
        source: req.body
      });
  
      res.json({ status });
    } catch (err) {
      res.status(500).end();
    }
})

module.exports = app;
