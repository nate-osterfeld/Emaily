const requireLogin = require('../middlewares/requireLogin.js')
const requireCredits = require('../middlewares/requireCredits.js')

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

    })
}
