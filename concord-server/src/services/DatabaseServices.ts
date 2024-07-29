import Models from '../models/index'
class DatabaseService {
    public async join_room (payload:any){
        const { room_id,user } = payload;
        const room = await Models.rooms.findOne({room_id:room_id});
        if(!room.users.includes(user)){
            await Models.rooms.updateOne({ room_id : payload.room_id },
                { $push: { users: payload.user } }
              );
        }   
    }

    public async create_room (payload:any){
        const room = new Models.rooms({
            room_id:payload.room_id,
            topic:payload.topic,
            description:payload.description,
            users:[payload.user]
        });
        await room.save();
    }

    public async rooms (){
        const rooms = await Models.rooms.find({});
        return rooms;
    }

    public async getRoom(room_id:any) {
        const rooms = await Models.rooms.findOne({
            room_id:room_id
        });
        return rooms;
    }

    public async removeuser(payload:any){
        const {user,room_id} = payload;
        //check is any users available
        const room = await Models.rooms.findOne({room_id:room_id});
        if(room.users.length  === 1 ){
            await Models.rooms.deleteOne({room_id:room_id});
        }
        else {
            const updatedUser = room.users.filter((u:any) => u!== user)
            await Models.rooms.updateOne({ room_id : room_id },
                { users:updatedUser}
              )
        }
    }
}

export default DatabaseService;