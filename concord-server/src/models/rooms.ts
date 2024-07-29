import { model,Schema } from 'mongoose';

const roomSchema:any = new Schema({
    room_id : {
        required:true,
        type:String,
        unique:true
    },
    topic:{
        default:null,
        type:String
    },
    description:{
        type:String,
        required:false
    },
    users : []
},{
    timestamps:true
});


const Room = model('room',roomSchema);

export default Room;