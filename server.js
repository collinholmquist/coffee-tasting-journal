const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const path = require('path')
const coffeeConfig = require('./static/coffeeConfig')
const Coffee = require('./models/coffee.model')

const port = process.env.PORT || 3000;

app.use("/public",express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))

app.set("view engine", "ejs")

//create connection to db


app.get('/', (req, res) => {

    res.render('pages/index', {
        brewmethods: coffeeConfig.brew_methods,
        taste_profile: coffeeConfig.flavor_profiles
    })
})



app.post('/', async (req, res) => {

    
    try{

        if(!req.body){
            res.status(400).send({
                message: 'Content cannot be empty'
            })
        }
    
        const newCoffee = new Coffee({
            roaster: req.body.roaster,
            region: req.body.region,
            tasting_notes: req.body.tasting_notes.toString(),
            brew_method: req.body.brew_method,
            comments: req.body.comments
        })

        console.log(newCoffee.tasting_notes)

        Coffee.create(newCoffee, (err, data) => {
            if (err) 
            res.status(500).send({ message: err.message || "Some error occurred while creating the entry."})
            else {
              res.send(data)
          }
        })
    


    } catch(error) {
        res.redirect('/')
    }

})

app.listen(port, () => console.log("Server Up and running"));