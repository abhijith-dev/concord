import { response } from 'express';
import jwt from 'jsonwebtoken';

export const generateTokens = async (params: any) => {
  let access_token = '';
  try {
    const { _id }: any = params;
    const { JWT_SECRET } = process.env;
    access_token = await jwt.sign(
      {
        _id,
      },
      JWT_SECRET as string,
      {
        expiresIn: '10h',
      }
    );
  } catch (error) {
    access_token = '';
  }
  return access_token;
};

export const verifyToken = async (params: any) => {
  let res = {};
  try {
    const { JWT_SECRET } = process.env;
    const data = await jwt.verify(params,JWT_SECRET as string);
    res = {
       status:true,
       data
    }
  } catch (error) {
    res = {
       status:false,
       data:error
    };
  }
  return res;
};