import multer, { DiskStorageOptions } from 'multer';
import { Request } from 'express';

let storage = multer.diskStorage({
    destination(req, file: any, cb: Function) {
        cb(null, __dirname + '/../../uploads/users');
    },
    filename: function (req: Request, file: any, cb: Function) {
        const name = Date.now() + '.' + file.mimetype.replace('image/','');
        cb(null, name);
    }
});

let storagePosts = multer.diskStorage({
    destination(req, file: any, cb: Function) {
        cb(null, __dirname + '/../uploads/posts');
    },
    filename: function (req: Request, file: any, cb: Function) {
        const name = Date.now() + '.' + file.mimetype.replace('image/','');
        cb(null, name);
    }
});

  
let upload = multer({ storage: storage });
let uploadPosts = multer({ storage: storagePosts });

let UploadGallery = multer.diskStorage({
    destination(req, file: any, cb: Function) {
        cb(null, __dirname + '/../uploads/gallery');
    },
    filename: function (req: Request, file: any, cb: Function) {
        const name = Date.now() + '.' + file.mimetype.replace('image/','');
        cb(null, name);
    }
});

export { upload, uploadPosts};