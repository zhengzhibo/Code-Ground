const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileASync')
const dburl = process.env.NODE_ENV === "production" ? '../db-file.json' : 'db/db-file.json'
const adapter = new FileSync(dburl);

module.exports = low(adapter);