const sql = require('./db.js')

const User = function(user) {

    this.email = user.email,
    this.password = user.password
}

User.create = (newUser, result) => {

    sql.query(`INSERT INTO users SET ${newUser}`, (err, res) =>{

        if(err){
            console.error(err)
            result(err, null)
            return
        }

        console.log('New user created', {id: res.insertId, ...newUser})
        result(null, {id: res.insertId, ...newUser})
    })
}

User.getAll = (result) => {
        sql.query( `SELECT * FROM users`, (err, res) => {

            if(err) {
                console.error(err)
                result(err, null)
                return
            }

            result(null, res)
        })
}

User.findById = (id, result) => {

    sql.query(
        `SELECT * FROM users WHERE id = ${id}`,
        (err, res) => {
            if(err) {
                console.log("error", err)
                result(err, null)
                return
            }

           result(null, res)
           return
        }
    )
}

User.findOne = (email, result) =>{

    sql.query(`SELECT * FROM users WHERE email = ${email}`,
    (err, res) =>{
        if(err) {
            console.log("error", err)
            result(err, null)
            return
        }

        result(null, res)
        return
    }
    )
}



module.exports = User