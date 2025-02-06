const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy // Creates instance of Google strategy
const keys = require('./config/keys.js')

const app = express()

// Inform passport of strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', // route user is directed to after granting permission (includes user's "code")
		},
		(accessToken) => {
			console.log(accessToken)
		},
	),
)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log('Server running on ' + PORT)
})
