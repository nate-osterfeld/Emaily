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

	// NOTE: passport.authenticate('google') is the middleware responsible for using the url param: "?code=x"
	//       to find the user and return it in the callback of the Google Strategy
	app.get(
		'/auth/google/callback', // route that receives the code from Google request
		passport.authenticate('google'), // passport uses that code to get user and serialize data
		(req, res) => {
			res.redirect('/surveys') // redirect user to '/surveys' + set-cookie in response
		}
	)
    
    app.get('/api/logout', (req, res) => {
        // logout is a password helper fn that deletes cookie so no more id for user
        req.logout()
		res.redirect('/')
    })

    // We can now access our user object on the request object!!
	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
}
