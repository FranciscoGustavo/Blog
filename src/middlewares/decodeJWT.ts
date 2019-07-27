import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import unless from 'express-unless';

import { jwtSecret } from '../config/secrets';

export default function (options: any) {

  let decodeJWT =  <unless.RequestHandler>( (req: Request, res: Response, next: NextFunction) => {
    // Validate that exist the parameter authorization into headers
    if(!req.headers.authorization) {
      res.status(402).json({ message: 'You need to send the parameter authorization'})
    } else {
      // Decode JWT
      (req as any).decodeJWT = jwt.verify(req.headers.authorization.split(" ")[1], jwtSecret);
      next();
    }

  });

  decodeJWT.unless = unless;

  return decodeJWT;
} 
