const db = require('./db.js') 
const util = require('util')
//sql represents the reference to the connection
//promiseify the database connection
const sql = util.promisify(db.query).bind(db)


const Entry = function(entry){
    this.roaster_name = entry.roaster_name
    this.region_name = entry.region_name
    this.tasting_notes = entry.tasting_notes
    this.brew_method = entry.brew_method
    this.comments = entry.comments
    this.author_id = 1

}

Entry.create = async (entry, result) => {

    console.log(entry)

    let roaster_query = `SELECT id FROM roasters WHERE roaster_name = '${entry.roaster_name}'`
    let region_query = `SELECT id FROM region WHERE region_name = '${entry.region_name}'`
    let insert_roaster = `INSERT INTO roasters (roaster_name) VALUES ('${entry.roaster_name}');`
    let insert_region = `INSERT INTO region (region_name) VALUES ('${entry.region_name}');`

    try {

        let roaster_insertId
        let region_insertId

        const roaster_res = await sql(roaster_query)
        const region_res = await sql(region_query)

        if(roaster_res.length == 0){
            const roaster_id = await sql(insert_roaster)
            roaster_insertId = (JSON.parse(JSON.stringify(roaster_id))).insertId
        } else{
            roaster_insertId = (JSON.parse(JSON.stringify(roaster_res[0]))).id
        }

        if(region_res.length == 0){
            const region_id = await sql(insert_region)
            region_insertId = (JSON.parse(JSON.stringify(region_id))).insertId
        } else {
            region_insertId = (JSON.parse(JSON.stringify(region_res[0]))).id

        }

        let create_query = `INSERT INTO entries (roaster_id, region_id, tasting_notes, brew_method, comments, author_id) VALUES ((${roaster_insertId}), (${region_insertId}), '${entry.tasting_notes}', '${entry.brew_method}','${entry.comments}', '${entry.author_id}');`

        const create_res = await sql(create_query)

        result(null, create_res)

    } catch(e) {
        console.error(e)
        result(err, null)
    }

    /*
    1. query the db to see if the roaster is currently there
    2. if roaster isn't there, then add it. otherwise, its there 
    3. return that roaster id.
    4. query the db to see if the region is currently there
    5. if region isn't there, then add it, other its there 
    6. return the region id.
    7. insert the new entry into the db using the roaster and region ids
    8. redirect response to the users' journal entries 
    */

   
    /* let region_query = `SELECT id FROM region WHERE region_name = '${entry.region}'`

    let insert_roaster = `INSERT INTO roasters (roaster_name) VALUES ('${entry.roaster}');`
    let insert_region = `INSERT INTO region (region_name) VALUES ('${entry.region}');`

    let create_query = `INSERT INTO entries (roaster_id, region_id, tasting_notes, brew_method, comments, author_id) VALUES ((${roaster_query}), (${region_query}), '${entry.tasting_notes}', '${entry.brew_method}','${entry.comments}', '${entry.author_id}');`


     sql.query(roaster_query, (err, res1) => {

        if(err) {console.error(err)
            result(err, null)
            return 
        }
        //if res1 doesn't have a length then we need to insert the data
        else if(res1.length == 0) {
            sql.query(insert_roaster, (err, res2) => {
                if(err) {console.error(err)
                    result(err, null)
                    return
                }  
                let json_res2 = JSON.parse(JSON.stringify(res2)) 
                console.log('res2 response:', json_res2.insertId)
                result(null, roaster_id = json_res2.insertId)
                return
            })
        } else {
            result(null, JSON.parse(JSON.stringify(res1[0])))
        }
         
    }) */

   


    /* sql.query(create_query, (err, res) => {
        if(err){
            console.error(err)
            result(err, null)
            return
        }

        console.log('New entry created', {id: res.insertId, ...newEntry })
        result(null, {id: res.insertId, ...newEntry })
    }) */
}

Entry.getAll = async (result) => {

    try {
        const res = await sql(`SELECT * FROM user_entries`)
        result(null, res)
    }
    catch(e) {
        console.error(e)
        result(err, null)
    }

/* 
    sql.query("SELECT * FROM entries", (err, res) => {

        if(err) {
            console.error(err)
            result(err, null)
            return
        }

        result(null, res)
    }) */
}

Entry.orderBy = (tableName, result) => {

    //console.log(tableName)
    sql.query(`SELECT * FROM entries ORDER BY ${tableName} ASC`, (err, res) => {
        if(err) {
            console.error(err)
            result(err,null)
            return
        }
        //console.log(res)
        result(null, res)
    })
}

Entry.editById = async (entryId, entry, result) => {

    let roaster_query = `SELECT id FROM roasters WHERE roaster_name = '${entry.roaster_name}'`
    let region_query = `SELECT id FROM region WHERE region_name = '${entry.region_name}'`
    let insert_roaster = `INSERT INTO roasters (roaster_name) VALUES ('${entry.roaster_name}');`
    let insert_region = `INSERT INTO region (region_name) VALUES ('${entry.region_name}');`

    try {

        const roaster_res = await sql(roaster_query)
        const region_res = await sql(region_query)



        if(roaster_res.length == 0){
            const roaster_editId = await sql(insert_roaster)
            roaster_insertId = (JSON.parse(JSON.stringify(roaster_editId))).insertId
        } else{
            roaster_insertId = (JSON.parse(JSON.stringify(roaster_res[0]))).id
        }

        if(region_res.length == 0){
            const region_editId = await sql(insert_region)
            region_insertId = (JSON.parse(JSON.stringify(region_editId))).insertId
        } else {
            region_insertId = (JSON.parse(JSON.stringify(region_res[0]))).id

        }

        let update_query = `UPDATE entries SET roaster_id = ${roaster_insertId}, region_id =${region_insertId}, tasting_notes = '${entry.tasting_notes}', brew_method = '${entry.brew_method}',comments = '${entry.comments}', author_id = '${entry.author_id}' WHERE entry_id = ${entryId};`

        const update_res = await sql(update_query)

        if(update_res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return
        }

        result(null, update_res)

    }
    catch(e) {console.error(e)}

    /* sql.query(
        ,
        ,
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
    ) */
}

Entry.findById = async (entryId, result) => {

    try{
        findBy_res = await sql(`SELECT * FROM user_entries WHERE entry_id = ${entryId}`)

        if(findBy_res.length) {
            result(null, findBy_res[0])
            return
        }

    } catch(e) {
        console.error(e)
    }

    /* sql.query(
        ,
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
    ) */
}

Entry.delete = async (entryId, result) => {


    try {
        delete_res = await sql(`DELETE FROM entries WHERE entry_id = ${entryId}`)
        
        if(delete_res.affectedRows == 0){
            result({kind: 'not_found'}, null)
            return
        }

        result(null, delete_res)
    }
    catch(e) {console.error(e)}



    /* sql.query(`DELETE FROM entries WHERE entry_id = ${entryId}`, (err, res) => {

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
    ) */
}

module.exports = Entry