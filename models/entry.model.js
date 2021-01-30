const sql = require('./db.js')

//sql represents the reference to the connection

const Entry = function(entry){
    this.roaster = entry.roaster
    this.region = entry.region
    this.tasting_notes = entry.tasting_notes
    this.brew_method = entry.brew_method
    this.comments = entry.comments

}

Entry.create = (newEntry, result) => {
    sql.query("INSERT INTO coffee SET ?", newEntry, (err, res) => {
        if(err){
            console.error(err)
            result(err, null)
            return
        }

        console.log('New entry created', {id: res.insertId, ...newEntry })
        result(null, {id: res.insertId, ...newEntry })
    })
}

module.exports = Entry