const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileASync');
const common = require('../common');

const dburl = common.db;
const adapter = new FileSync(dburl);

module.exports = low(adapter);