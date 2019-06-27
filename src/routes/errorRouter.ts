import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

function error(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    
    console.log('You are here');
    
    res.json({hi:'Hola', error});
}

export default error;