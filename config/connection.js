const mongoose = require('mongoose');
// set up MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = mongoose.connection;