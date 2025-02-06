const express = require('express')
require('./services/passport.js') // only need the file to run, don't need any variables imported

const app = express()

// Run auth routes and pass it express app
require('./routes/authRoutes.js')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log('Server running on ' + PORT)
})
