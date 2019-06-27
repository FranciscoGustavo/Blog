//Modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';

// Models
import User, { IUser } from '../models/User';

import { jwtSecret } from '../config/secrets';

class SessionsController {
    private payload: any | IUser;
    private token: any;

    constructor() {
        this.payload = null;
        this.token = null;

        this.authenticate = this.authenticate.bind(this);
        this.generateToken = this.generateToken.bind(this);
        this.sendToken = this.sendToken.bind(this);
    }

    authenticate(req: Request, res: Response, next: NextFunction) {
        if(!req.body.email || !req.body.email){
            return res.status(404).json({ message: 'Please you need to send the email and password' });
        }        

        const email = req.body.email;
        const password = req.body.password;
        
        User.findOne({ email })
        .then(user => {
            if(!user) return res.status(404).json({ message: 'This user don\'t exist' });
            
            (user as any).verifyPassword(password)
            .then((valid: boolean) => {
                if(!valid) return res.status(404).json({ message: 'The password is not valid' });
                
                const { firstName, lastName, photo, email, description, skills, information } = (user as any);

                this.payload = { firstName, lastName, photo, email, description, skills, information };
                this.payload.iat = moment().unix();
                this.payload.exp = moment().add(3,'hours').unix();

                next();
            })
            .catch((error: any) => {
                next(new Error(error)); 
            });
        })
        .catch(error => {
            next(new Error(error));
        });
        
    }

    generateToken(req: Request, res: Response, next: NextFunction) {
        if(!this.payload) return new Error('Invalid payload');

        this.token = jwt.sign(this.payload , jwtSecret);
        next();
    }

    sendToken(req: Request, res: Response) {
        if(!this.token) return res.status(422).json({ message: 'Could not create session'});

        res.status(200).json({
            message: 'Session created successfull',
            token: this.token,
            user: this.payload
        });

        this.token = null;
        this.payload = null;
    }
}

const Controller = new SessionsController();

export { SessionsController, Controller };