require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const PORT = 3000;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'combined.log', maxsize: 5 * 1024 * 1024, maxFiles: 5 })
    ]
});

app.use(cors());

// rate limiter middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});
app.use(limiter);

app.use(express.json());

// payment endpoint 
app.post('/pay', async (req, res) => {
    const { price } = req.body;

    if (!price) {
        return res.status(400).json({ error: 'Price not provided.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(price * 100), // convert to cents
            currency: 'USD',
            payment_method_types: ['card'],
        });

        const clientSecret = paymentIntent.client_secret;

        logger.info(`Payment intent created.`);
        res.json({ message: 'Payment initiated', clientSecret });
    } catch (error) {
        logger.error(`Error during payment initiation: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// creating subscription based on users choice of plan
app.post('/create-subscription', async (req, res) => {
    const { email, source, plan_id } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: email,
            source: source
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: plan_id }]
        });

        logger.info(`Subscription created for customer ${customer.id} with plan ${plan_id}`);
        res.json({ message: 'Subscription created successfully', subscriptionId: subscription.id });
    } catch (error) {
        logger.error(`Error during subscription creation: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// canceling subscription 
app.post('/cancel-subscription', async (req, res) => {
    try {
        const { subscriptionId } = req.body;
        const canceledSubscription = await stripe.subscriptions.del(subscriptionId);
        logger.info(`Subscription ${canceledSubscription.id} has been cancelled.`);
        res.json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
        logger.error(`Error during subscription cancellation: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

app.post('/stripe', async (req, res) => {
    try {
        const paymentIntent = req.body;

        if (paymentIntent.status === 'succeeded') {
            logger.info('Payment succeeded!');
        } else {
            logger.info('Payment initiated!');
        }

        res.json({ ok: true });
    } catch (error) {
        logger.error(`Error during payment confirmation: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});