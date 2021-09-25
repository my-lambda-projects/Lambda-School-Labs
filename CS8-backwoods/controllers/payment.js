// test key need to put into config when using production key
const stripe = require("stripe")("sk_test_KnLfn1BPm8LLeLxmyomibFJ3");

const payment = async (req, res) => {
    try {
        let { status } = await stripe.charges.create({
            amount: 1000,
            currency: "usd",
            description: "test charge",
            source: req.body
        });

        res.json({ status });
    } catch (err) {
        res.status(500).end();
    }
}

module.exports = { payment };