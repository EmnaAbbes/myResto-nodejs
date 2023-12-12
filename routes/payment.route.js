const express = require('express');
const router = express.Router();

const Stripe = require('stripe')('sk_test_51N29QlJcXDJf5UmYOhsSvPYPp3KDOxZS01jCu8k2Z9AKAxPyuraAV4VS7MSM9xblcBJWAMsQUQCoJGEcXstUMpzD00auU1wHEj');

router.post('/', async (req, res) => { console.log(req.body)
    let status, error;
    const { token, amount } = req.body;
    try {
      await Stripe.charges.create({
        source: token.id,
        amount,
        currency: 'usd',
      });
      status = 'success';
    } catch (error) {
      console.log(error);
      status = 'Failure';
    }
    res.json({ error, status });
  });

module.exports = router;
