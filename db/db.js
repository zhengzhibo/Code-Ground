const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileASync');
const config = require('../config');

const dburl = config.db;
const adapter = new FileSync(dburl);

module.exports = low(adapter);