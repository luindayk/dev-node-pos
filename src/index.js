require('dotenv').config();
require = require('esm')(module);
module.exports = require('./config/server.config.js').default;