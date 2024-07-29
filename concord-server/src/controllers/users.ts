import {Request,Response} from 'express';
import { sendEmail } from '../services/MessageService';
import models from '../models/index';
import { getRandomName } from '../utils';
import { generateTokens,verifyToken } from '../functions/TokenManager';


const MAGIC_OTP = '202406';

const userControllers = {

    onboard : async(req:Request,res:Response) => { 
       try {
       await sendEmail(req.body.emailAddress);
       return res.status(202).json(req.body);
       } catch (error) {
        return res.status(500).json({
            status:500,
            message:'internal server error'
          })
       }
    },

    verifyuser : async(req:Request,res:Response) => {
       try {
          const { otp,emailAddress } = req.body;
          const body = {
            email:emailAddress,  
            location: 'bangalore'
          }
          if(otp === MAGIC_OTP){
            const existedUser:any = await models.users.findOne({email:emailAddress});
          if(existedUser?._id){
            const access_token:any = await generateTokens(existedUser);
            return res.status(201).json({
               username:existedUser?.username || null, 
               access_token,
               id:existedUser._id
            });
          }
          else{
            const users = new models.users(body);
            const response = await users.save();
            const access_token = await generateTokens(response);
            return res.status(201).json({
               username:users?.username || null, 
               access_token,
               id:users._id
            });
          }
          }
          else {
            return res.status(401).json({
               status:401,
               message:'unathorized'
             })
          }
         
       } catch (error) {
          return res.status(500).json({
            status:500,
            message:'internal server error'
          })
       }
    },

    displayName : async (req:Request,res:Response) => {
        try {
           let { username } = req.body;
           const { id } = req.body;
           if(!username) username = getRandomName();
           const user:any = await models.users.findOneAndUpdate({_id:id},{username:username});
           const access_token = await generateTokens(user);
           return res.status(201).json({
            username:user?.username || null, 
            access_token,
            id:user._id
          });

        } catch (error) {
         return res.status(500).json({
            status:500,
            message:'internal server error'
          }) 
        }
    },

    users : async (req:Request,res:Response) => {
       try {
         const { id } = req.query;
         if(id) {
            const user = await models.users.findOne({_id:id});
            return res.status(200).json(user);
         }
         else{
            const user = await models.users.find();
            return res.status(200).json(user);
         }
       } catch (error) {
         return res.status(500).json({
            status:500,
            message:'internal server error'
          }) 
       }
    },

    authentication: async (req:Request,res:Response) => {
      try {
        const { authorization } = req.headers;
        const { status, data } :any = await verifyToken(authorization);
        if(status) {
           const user = await models.users.findOne({_id:data._id});
           return res.status(200).json(user);
        }
        else{
           return res.status(404).json({});
        }
      } catch (error) {
        return res.status(500).json({
           status:500,
           message:'internal server error'
         }) 
      }
   }
};

export default userControllers;