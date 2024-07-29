import { model,Schema } from 'mongoose';

const userSchema:any = new Schema({
    email : {
        required:true,
        type:String,
        unique:true
    },
    location:{
        default:null,
        type:String
    },
    username:{
        type:String,
        required:false
    }
},{
    timestamps:true
});


const User = model('users',userSchema);

export default User;