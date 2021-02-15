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

Entry.getAll = (result) => {
    sql.query("SELECT * FROM coffee", (err, res) => {

        if(err) {
            console.error(err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

Entry.orderBy = (tableName, result) => {

    //console.log(tableName)
    sql.query(`SELECT * FROM coffee ORDER BY ${tableName} ASC`, (err, res) => {
        if(err) {
            console.error(err)
            result(err,null)
            return
        }
        //console.log(res)
        result(null, res)
    })
}

Entry.editById = (entryId, entry, result) => {

    console.log(entryId)

    sql.query(
        `UPDATE coffee SET roaster = ?, region = ?, tasting_notes = ?, brew_method = ?, comments = ? WHERE Coffee_ID = ?`,
        [entry.roaster, entry.region, entry.tasting_notes, entry.brew_method, entry.comments, entryId],
        (err, res) => {
            if (err){
                console.log("error", err)
                result(null, err)
                return
            }

            if(res.affectedRows == 0) {
                result({kind: "not_found"}, null)
                return
            }

            console.log("updated entry: ", {entryId: entryId, ...entry})
            result(null, {entryId: entryId,...entry})
        }
    )
}

Entry.findById = (entryId, result) => {

    sql.query(
        `SELECT * FROM coffee WHERE Coffee_ID = ${entryId}`,
        (err, res) => {
            if(err){
                console.log("error", err)
                result(err, null)
                return
            }

            if(res.length) {
                //console.log('entry found')
                result(null, res[0])
                return
            }
        }
    )
}

Entry.delete = (entryId, result) => {

    sql.query(`DELETE FROM coffee WHERE Coffee_ID = ${entryId}`, (err, res) => {

        if(err) {
            console.log("error", err)
            result(err, null)
            return
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return
        }
        console.log('deletion succesful')
        result(null, res)

    }
        
       
            
    )
}

module.exports = Entry