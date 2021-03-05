const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

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
/* app.use('/', userRouter)
app.use('/', authRouter) */
//app.use(entryRouter)
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)


//require('./routes/entry.route.js') (app)

app.listen(port, () => console.log("Server Up and running"));