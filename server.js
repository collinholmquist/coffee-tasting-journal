const express = require('express')
//const bodyparser = require('body-parser')
const app = express()
//const path = require('path')

const port = process.env.PORT || 3000;

//app.use("/public",express.static('public'))
//app.use(bodyparser.urlencoded({extended: true}))

app.set("view engine", "ejs")
//app.set("views", path.join(__dirname, "views/index.ejs"))

app.get('/', (req, res) => {
    res.render('pages/index')
})


app.listen(port, () => console.log("Server Up and running"));