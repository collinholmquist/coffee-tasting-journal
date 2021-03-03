const User = require("../models/user.model")
const config = require("../auth.config")

let jwt = require("jsonwebtoken")
let bcrypt = require('bcryptjs')

exports.signup = (req ,res) => {

    console.log(req.body)

   User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }, (err, user) => {
        if(err) {
            res.status(500).send({message: err.message})
        } else {
            console.log(user)
            res.send({message: "User was successfully registered"})
        }
    }) 
}

exports.signin = (req, res) => {


    User.findOne(req.body.email, (err, user) => {

        if(err){
            res.status(500).send({message: err.message})
        }
        if(!user) {
             return res.status(404).send({message: 'User not found'})
        }

        let validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!validPassword) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password"})
        }

        let token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400})

        res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token
        })
    })
}