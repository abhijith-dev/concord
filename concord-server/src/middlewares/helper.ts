import {Request,Response,NextFunction} from 'express';
import colors from 'colors';

const HelperMiddleware = (req:Request,res:Response,next:NextFunction) => {
  const date = new Date();

  if(req.url){
    console.log(
        `${colors.green(`[${date.toDateString()} - ${date.toTimeString()}]`)} ${colors.bold.blue(req.method)}: ${colors.blue(req.url)}`
    );
  }
  next();
};

export default HelperMiddleware;