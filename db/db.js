const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileASync')
const dburl = process.env.DEBUG == 'true' ? 'db/db-file.json' : '../db-file.json'
const adapter = new FileSync(dburl);

module.exports = low(adapter);