// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Kf1LABlskhJl6mEwueCKc8Gf0DRHcaBN8esbXdEjgrSfdgkQMLGE1YOeJed99KUSFXmyuRWRlHDVQiZ4yMz3kcp00iWWqHjZf');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'pr_1234',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.get('/products', async (req, res) => {
  res.status(200).json({
    data:{
      line_items: [
        {
          item_name: "The cover of Stubborn Attachments",
          price_id: 'pr_1234',
          price: 20
        },
        {
          item_name: "The cover of Stubborn Attachments 2: Electric Bogaloo",
          price_id: 'pr_5678',
          price: 35
        },
      ],
    }
  })
})

app.listen(4242, () => console.log('Running on port 4242'));