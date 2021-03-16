const dotenv = require('dotenv')

dotenv.config()

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'us-cdbr-east-03.cleardb.com'
// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'bfba53d28f0f17'
// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'a4593326'
// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'heroku_cae293aa3d8239e'

module.exports = {host, user, password, database}