//const roles = require("../models/role.model")
const User = require("../models/user.model")

checkForDuplicates = (req, res, next) => {

    //console.log(req.body.email)

    //Check for the username
    User.findOne(req.body.email, (err , user) => {

        if(err) {
            console.log('error', err)
        } else if(user) {
            //console.log(user)
            res.status(400).send({
                message: "Failed! Email is already in use"
            })
            return
        }
        next()    
    })
    
}

/* checkRoles = (req, res, next) => {

    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++){
            if (!roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Role does not exist!"
                })
                return
            }
        }
    }
    next()
} */

const verifySignUp = {
    checkForDuplicates: checkForDuplicates
}

module.exports = verifySignUp