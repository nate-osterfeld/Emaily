const passport = require('passport')

// Export routes as arrow function to receive express app object
module.exports = (app) => {
	// Takes care of "options: StrategyOptions" config object (first argument of new GoogleStrategy)
	app.get(
		'/auth/google', // route to enter into oauth flow
		passport.authenticate('google', {
			// specifies the strategy based on the identifier existing in GoogleStrategy instance
			scope: ['profile', 'email'], // specifies permissions
		}),
	)

	// route to handle callback from Google after user grants permissions and we get their "code" AKA "verify" callback (2nd argument of new GoogleStrategy)
	app.get('/auth/google/callback', passport.authenticate('google'))

    // We can now access our user object on the request object!!
	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
}
