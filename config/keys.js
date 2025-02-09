if (process.env.NODE_ENV === 'production') {
    // Export keys for prod environment
    module.exports = require('./prod.js')
} else {
    // Export keys for dev environment
    module.exports = require('./dev.js')
}
