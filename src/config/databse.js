'use strict'

const mongoose = require('mongoose');
const DB_NAME = 'biblioteca';
      
let dataBase = {
    connect: function () {
        mongoose.connect(
            'mongodb://localhost:27017/' + this.DB_NAME,
            { useCreateIndex: true, useNewUrlParser: true }
        )
        .then(() => { console.log('Data base is running'); })
        .catch();
    },

    DB_NAME : DB_NAME,
    MONGO_URI: 'mongodb://localhost:27017/' + this.DB_NAME,

    connection: function () {
        if(mongoose.connection) return mongoose.connection;

        return this.connect();
    }
}
module.exports = dataBase;