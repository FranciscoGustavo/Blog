'use strict'

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
        cb(null, __dirname + '/../uploads/users');
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '.' + file.mimetype.replace('image/','');
        cb(null, name);
    }
});

let storagePosts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads/posts');
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '.' + file.mimetype.replace('image/','');
        cb(null, name);
    }
});

  
let upload = multer({ storage: storage });
let uploadPosts = multer({ storage: storagePosts });

module.exports = { upload, uploadPosts};