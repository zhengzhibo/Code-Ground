const low = require('lowdb');
const FileASync = require('lowdb/adapters/FileAsync');
const common = require('../common');

const dburl = common.db;
const adapter = new FileASync(dburl);

module.exports = low(adapter);