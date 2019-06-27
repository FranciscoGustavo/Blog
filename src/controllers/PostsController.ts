'use strict'

// Import Modules
import fs from 'fs';
import path from 'path';
import showdown from 'showdown';

import { Request, Response, NextFunction } from 'express';

// Import Model
import Post, { IPost } from '../models/Post';

// Plugins
import buildParams from '../plugins/buildParams';
const upload = require('../plugins/upload').uploadPosts;



// Converter markdown
const converter = new showdown.Converter({
    tables: true,
    tablesHeaderId: true
});

class PostsController {
    private VALID_PARAMS: string[];
    constructor() {
        // Valid Params
        this.VALID_PARAMS =  ['title', 'body'];


        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);

        this.getCover = this.getCover.bind(this);
        this.getImage = this.getImage.bind(this);
        this.multer = this.multer.bind(this);
    
    }

    find(req: Request, res: Response, next: NextFunction) {
        Post.findOne({slug: req.params.slug}).populate({ path: '_user'})
        .then(post => {
            (req as any).POST = post;
            next();
        })
        .catch(error => {
            console.log(error);
            
            res.json(error);
        });
    }

    index(req: Request, res: Response) {
        Post.find()
        .then(posts => {
            res.json({
                title: 'My Blog',
                blog: true,
                posts
            });
        })
        .catch(error => {
            new Error(error);
        });
    }

    show(req: Request, res: Response) {
        const body = converter.makeHtml((req as any).POST.body);
        
        res.json({
            post: (req as any).POST,
            blog: true,
            body
        });
    }

    create(req: Request, res: Response) {
        // Build Params
        let params: IPost = buildParams(this.VALID_PARAMS, req.body);

        //params._user = req.user._id;
        
        Post.create(params)
        .then(post => {
            res.json({post})
        })
        .catch(error => {
            res.status(500).json({error: error});
        })

    }

    update(req: Request, res: Response) {
        let POST = (req as any).POST;
        const FILES = (req as any).files;
        const params = buildParams(this.VALID_PARAMS, req.body);
        const cover = POST.cover;
        const image = POST.image;
        const file_path_image = __dirname + '/../uploads/posts/' + image;
        const file_path_cover = __dirname + '/../uploads/posts/' + cover;

        POST = Object.assign(POST, params);

        if(FILES.image) {
            POST.image = FILES.image[0].filename
            fs.unlinkSync(file_path_image);
        }

        if(FILES.cover) {
            POST.cover = FILES.cover[0].filename
            fs.unlinkSync(file_path_cover);
        }

        POST.save()
        .then((post:IPost) => {
            res.redirect('/my');
        })
        .catch((error: any) => {
            new Error(error);
        });
    ;}

    getCover(req: Request, res: Response) {
        const path_file = __dirname + '/../../uploads/posts/' + req.params.cover;
        console.log(__dirname + '/../../uploads/posts')
        console.log(path_file)
        fs.exists(path_file, (exist) => {
            if(exist) {
                res.sendFile(path.resolve(path_file));
            } else {
                res.json({message: 'Resource don\'t exist' })
            }
        });
    }

    getImage(req: Request, res: Response) {
        const path_file = __dirname + '/../uploads/posts/' + req.params.image;

        fs.exists(path_file, (exist) => {
            if(exist) {
                res.sendFile(path.resolve(path_file));
            } else {
                res.json({message: 'Resource don\'t exist' })
            }
        });
    }

    multer() {        
        return upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cover', maxCount: 1 }])
    }

}

const Controller = new PostsController();

export { PostsController, Controller };
