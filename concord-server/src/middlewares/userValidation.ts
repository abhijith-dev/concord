import {NextFunction,Request,Response} from 'express';

export default async function(req:Request,res:Response,next:NextFunction){
   if(!req.body){
      return res.status(400).json({
         message:'Invalid request body',
         status:400
      });
    }
    if(Object.keys(req.body).length <= 0 ){
        return res.status(400).json({
           message:'Empty request body',
           status:400
        });
    }
    next(); 
}