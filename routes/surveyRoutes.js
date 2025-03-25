const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin.js')
const requireCredits = require('../middlewares/requireCredits.js')

const Survey = mongoose.model('surveys')

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // returns an array of objects with k/v email: email (set to Recipient schema)
            _user: req.user.id,
            dateSent: Date.now()
        })
    })
}
