const mysql = require('mysql')
const dbConfig = require('../dbConfig')

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
})

connection.connect(error=> {
    if(error){throw error}
    console.log('successfully connected to db')
})

module.exports = connection


