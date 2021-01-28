const sql = require('./db.js')

//sql represents the reference to the connection

const Coffee = function(coffee){
    this.roaster = coffee.roaster
    this.region = coffee.region
    this.tasting_notes = coffee.tasting_notes
    this.brew_method = coffee.brew_method
    this.comments = coffee.comments

}

Coffee.create = (newCoffee, result) => {
    sql.query("INSERT INTO coffee SET ?", newCoffee, (err, res) => {
        if(err){
            console.error(err)
            result(err, null)
            return
        }

        console.log('New entry created', {id: res.insertId, ...newCoffee })
        result(null, {id: res.insertId, ...newCoffee })
    })
}

module.exports = Coffee