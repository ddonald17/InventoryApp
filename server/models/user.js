import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: {  
        type: String,
        required: true
     },
     lastName:{
         type:String
     },
    email: {
        type: String,
        required: true
     },
    password: { 
        type: String,
        required: true
     },
     confirmPassword: {
         type: String
     },
     id:{
         type:String
     }
});

const User = mongoose.model('User',UserSchema);

export default User;