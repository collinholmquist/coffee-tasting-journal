const User = require("../models/user.model")
const config = require("../auth.config")

let jwt = require("jsonwebtoken")
let bcrypt = require('bcryptjs')

exports.signup = (req ,res) => {

    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }, (err, user) => {
        if(err) {
            res.status(500).send({message: err.message})
        } else {
            res.send({message: "User was successfully registered"})
        }
    })
}
