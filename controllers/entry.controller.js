const Entry = require('../models/entry.model.js')

exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    //create the object from the request's body.  
    const newEntry = new Entry({
        roaster: req.body.roaster,
        region: req.body.region,
        tasting_notes: req.body.tasting_notes.toString(),
        brew_method: req.body.brew_method,
        comments: req.body.comments
    })

    //console.log(newEntry.tasting_notes)

    Entry.create(newEntry, (err, data) => {
        if (err) 
        res.status(500).send({ message: err.message || "Some error occurred while creating the entry."})
        else {
          res.redirect('/journal')
      }
    })
}

exports.findAll = (req, res) => {

    Entry.getAll((err, data) => {
        if(err)
        res.status(500).send({message: err.message || "Some error retrieving all entries"})
        else{
            //console.log(JSON.stringify(data))
            const makeRawAnObject = row => ({...row})
            const convertedResponse = data.map(makeRawAnObject)
            //console.log(convertedResponse)
            res.render('pages/list', {convertedResponse})
        }
    })


}

exports.orderBy = (req, res) => {

        if(!req.body){
            res.status(400).send({
                message: 'Content cannot be empty'
            })
        }

        console.log(req.body.orderBy)

        Entry.orderBy(req.body.orderBy, (err, data)=> {
            if(err) res.status(500).send({message: err.message})
            else {
                const makeRawAnObject = row => ({...row})
                const convertedResponse = data.map(makeRawAnObject)
                res.render('pages/list', {convertedResponse})
            }
        })

}