const express = require('express')
const mongoose = require('mongoose')
require('./services/passport.js')
require('./models/User.js')
const keys = require('./config/keys.js')

mongoose.connect(keys.mongoURI)

const app = express()

// Run auth routes and pass it express app
require('./routes/authRoutes.js')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log('Server running on ' + PORT)
})
