const dotenv = require('dotenv')

dotenv.config()

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';
// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';
// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'oysterbeach31';
// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'coffee';

module.exports = {host, user, password, database}