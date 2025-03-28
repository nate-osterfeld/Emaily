const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy // Creates instance of Google strategy
const mongoose = require('mongoose')
const keys = require('../config/keys.js')

// Note: Only one arg to 'model' means we're getting the collection itself (in User.js we provided the schema as the second arg)
const User = mongoose.model('users')

// serialize user when they first log in
passport.serializeUser((user, done) => {
    // use 'user.id' instead of 'user.googleId' in case of multiple passport strategies we want to just use our own internal db id
    done(null, user.id)
})

// deserialize user upon future requests
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		if (user) {
			done(null, user)
		} else {
			done(null, false) // No valid user found, thus not authenticated
		}
	})
})

// Inform passport of strategy (1st argument works for 1st auth route, 2nd argument works for 2nd auth route)
passport.use(
	new GoogleStrategy(
		// Configures options for "/auth/google" route handler
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', // route user is directed to after granting permission (includes user's "code" as query string)
			proxy: true
		},
		// Verifies with callback function for "/auth/google/callback?code=<code>" route handler (where we enter user into database)
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id })
			
			if (existingUser) {
				done(null, existingUser)
			} else {
				const user = await new User({ googleId: profile.id }).save()
				done(null, user)
			}
		},
	),
)
