const jwt = require('jsonwebtoken')
const config = require("../auth.config")
//const User = require('../models/user.model')

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) =>{
        if(err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.userId
        next()
    })
}

/* isAdmin = (req, res, next) => {
    User.findById(req.userId, (err, user) => {

        if(err) {
            console.log("error", err)
        } else {
            user.getRoles()
        }
    })
} */

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt