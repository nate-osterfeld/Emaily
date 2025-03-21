const keys = require('../config/keys.js')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin.js')

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        })

        // Add 5 credits to user (remember we are getting user off passport cookie-session which now includes credits in db as well)
        req.user.credits += 5
        const user = await req.user.save()

        res.send(user)
    })
}
