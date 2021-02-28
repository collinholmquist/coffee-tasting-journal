const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const coffeeConfig = require('./static/coffeeConfig')
const entryRouter = require('./routes/entry.route')
const port = process.env.PORT || 3000;

let corsOptions = {
    origin: 'http://localhost:3001'
}

app.use(cors(corsOptions))
app.use("/public",express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))

app.set("view engine", "ejs")

//create connection to db
app.use('/', entryRouter)


app.get('/', (req, res) => {

    res.render('pages/index', {
        brewmethods: coffeeConfig.brew_methods,
        taste_profile: coffeeConfig.flavor_profiles
    })
})

//require('./routes/entry.route.js') (app)

app.listen(port, () => console.log("Server Up and running"));