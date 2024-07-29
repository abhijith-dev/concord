import DatabaseService from "../services/DatabaseServices"

export const createRoom = async (payload:any) => {
   const database = new DatabaseService();
   await database.create_room(payload);
}

export const joinRoom = async (payload:any) => {
   const database = new DatabaseService();
   await database.join_room(payload);
}

export const getRooms = async () => {
    const database = new DatabaseService();
    const rooms = await database.rooms();
    return rooms;
 }

export const getRoom = async (room_id:any) => {
   const database = new DatabaseService();
    const rooms = await database.getRoom(room_id);
    return rooms;
}

export const removeFromRoom = async(payload:any) => {
   const database = new DatabaseService();
    const rooms = await database.removeuser(payload);
    return rooms;
}