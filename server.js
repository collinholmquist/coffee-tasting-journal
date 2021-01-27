const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const path = require('path')
const mysql = require('mysql')
const dbConfig = require('./dbConfig.js')
const coffeeConfig = require('./static/coffeeConfig')


const port = process.env.PORT || 3000;

app.use("/public",express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))

app.set("view engine", "ejs")

//create connection to db

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




app.get('/', (req, res) => {

    brewmethods = coffeeConfig.brew_methods
    console.log(brewmethods)
    taste_profile = coffeeConfig.flavor_profiles
    console.log(taste_profile)

    res.render('pages/index', {
        brewmethods: brewmethods,
        taste_profile: taste_profile
    })
})

app.listen(port, () => console.log("Server Up and running"));