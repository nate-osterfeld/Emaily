const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy // Creates instance of Google strategy
const keys = require('./config/keys.js')

const app = express()

// Inform passport of strategy
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

// Takes care of "options: StrategyOptions" config object (first argument of new GoogleStrategy)
app.get(
	'/auth/google', // route to enter into oauth flow
	passport.authenticate('google', { // specifies the strategy based on the identifier existing in GoogleStrategy instance
		scope: ['profile', 'email'], // specifies permissions
	}),
)

// route to handle callback from Google after user grants permissions and we get their "code" AKA "verify" callback (2nd argument of new GoogleStrategy)
app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log('Server running on ' + PORT)
})
