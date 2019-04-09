const low = require('lowdb');
const FileASync = require('lowdb/adapters/FileASync');
const common = require('../common');

const dburl = common.db;
const adapter = new FileASync(dburl);

module.exports = low(adapter);