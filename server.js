const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const coffeeConfig = require('./static/coffeeConfig')
const entryRouter = require('./routes/entry.route')
/* const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes') */
const port = process.env.PORT || 3000;

let corsOptions = {
    origin: 'http://localhost:8001'
}

app.use(cors(corsOptions))
app.use("/public",express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set("view engine", "ejs")

//create connection to db
app.use('/', entryRouter)
/* app.use('/', userRouter)
app.use('/', authRouter) */

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

app.get('/', (req, res) => {

    res.render('pages/index', {
        brewmethods: coffeeConfig.brew_methods,
        taste_profile: coffeeConfig.flavor_profiles
    })
})

//require('./routes/entry.route.js') (app)

app.listen(port, () => console.log("Server Up and running"));