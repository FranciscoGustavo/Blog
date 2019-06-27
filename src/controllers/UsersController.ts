'use strict'

// Import modules
import fs from 'fs';
import path from 'path';

import { Request, Response, NextFunction } from 'express'; 

// Import models
import { User, IUser } from '../models/User';
import Post, { IPost } from '../models/Post';
import Project from '../models/Project';

// Plugins
import { upload } from '../plugins/upload';
import buildParams from '../plugins/buildParams';

class UserController {
    private VALID_PARAMS: string[];
    private USER: any;

    constructor() {
        // Valid Params
        this.VALID_PARAMS = ['firstName','lastName', 'photo' ,'email','password','description','skills','information'];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);

    }

    find(req: Request, res: Response, next: NextFunction) {
        User.findOne({_id: req.params.id})
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'Resource don\'t exist'});
            } 
            this.USER = user;
            next();
        })
        .catch(error => {
            next(new Error(error));
        });
    }

    index(req: Request, res: Response) {
        User.find()
        .then(users => {
            res.json({message: 'HOLA', users})
        })
        .catch();
    }
 
    create(req: Request, res: Response, next: NextFunction) {        
        // Build params
        let params = buildParams(this.VALID_PARAMS, req.body);

        // Validate than exist necesary params
        if(
            !params.firstName ||
            !params.lastName ||
            !params.email ||
            !params.password ||
            !params.description ||
            !params.skills ||
            !params.information 
        ) {
            return res.status(404).json({message: 'You need to send all params'});
        }
        
        // To extract
        const FILES = (req as any).files;
        
        if(FILES.photo) {
            params.photo = FILES.photo[0].filename;
        }
    
        User.create(params)
        .then(user => {
            console.log(user);
            res.status(200).json({
                message: 'The user were create successfully', 
                user
            })
        })
        .catch(error => {
            new Error(error);
        });
    
    }
    
    show(req: Request, res: Response  ) {
        res.status(200).json({ message: 'User finded', user: this.USER});    
    }
    
    getPhoto(req: Request, res: Response, next: NextFunction){    
        const path_file = __dirname + '/../../uploads/users/' + req.params.photo;
        
        console.log(__dirname + '/../../uploads/users/' + req.params.photo);
        console.log(path_file);
        fs.exists(path_file, (exist) => {
            if(exist) {
                res.sendFile(path.resolve(path_file));
            } else {
                res.json({message: 'Resource don\'t exist' })
            }
        });
    }
    
    multer() {
        return upload.fields([{ name: 'photo', maxCount: 1 }]);
    }
}

const Controller: UserController = new UserController();

export { UserController, Controller };