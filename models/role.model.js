const sql = require('./db.js')

const Role = function(roles) {
    this.id = roles.id,
    this.name = roles.name
}

module.exports = Role