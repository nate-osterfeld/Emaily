const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy // Creates instance of Google strategy
const keys = require('../config/keys.js')

// Inform passport of strategy (1st argument works for 1st auth route, 2nd argument works for 2nd auth route)
passport.use(
	new GoogleStrategy(
		// Configures options for "/auth/google" route handler
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', // route user is directed to after granting permission (includes user's "code" as query string)
		},
		// Verifies with callback function for "/auth/google/callback?code=<code>" route handler (where we enter user into database)
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken) // access token is saved by google to remember the permissions granted
			console.log('refresh token', refreshToken) // used for updating permissions (more for authorization which we won't need)
			console.log('profile', profile) // contains all the information about our user
		},
	),
)
