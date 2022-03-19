// This is your test secret API key.
const stripe = require('stripe')('YOUR_SECRET_API_KEY');
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json())

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const item = req.body.line_items
  console.log(item)
  const session = await stripe.checkout.sessions.create({
    line_items: item,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.get('/products', async (req, res) => {
 // Fetch data about products from server here
})

app.listen(4242, () => console.log('Running on port 4242'));