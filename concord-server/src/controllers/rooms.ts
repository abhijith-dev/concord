import {Request,Response} from 'express';
import { getRooms,getRoom, removeFromRoom } from '../functions/DbOperations';

const RoomController = {
     getRooms : async (req:Request,res:Response) => {
        try {
            const rooms:any = await getRooms();
            return res.status(200).json({
                status:200,
                data:rooms
            });
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:'internal server error'
              })
        }
     },
     getRoom : async (req:Request,res:Response) => {
        try {
            const { id } = req.params;
            const room:any = await getRoom(id);
            return res.status(200).json({
                status:200,
                data:room
            });
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:'internal server error'
              })
        }
     },
     disconnect : async (req:Request,res:Response) => {
        try {
            const { room_id,user } = req.body;
            await removeFromRoom({room_id,user});
            return res.status(200).json({});
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status:500,
                message:'internal server error'
              })
        }
     }
     
}

export default RoomController;