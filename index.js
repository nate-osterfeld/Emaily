const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./models/User.js')
require('./services/passport.js')
const keys = require('./config/keys.js')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	}),
)
app.use(passport.initialize())
app.use(passport.session())

// Runs exported functions using express app
require('./routes/authRoutes.js')(app)
require('./routes/billingRoutes.js')(app)

if (process.env.NODE_ENV === 'production') {
	// Serves all static files (main.js, main.css, etc.)
	app.use(express.static('client/build'))

	// Handles all routes for non-static requests by React Router (e.g. /surveys)
	const path = require('path')
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log('Server running on ' + PORT)
})
