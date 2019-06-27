import { Request, Response, NextFunction } from 'express';

function CORSMiddleware(req: Request, res: Response, next: NextFunction){
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Application");

  next();
}

export { CORSMiddleware };
