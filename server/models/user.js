import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {  
        type: String,
        required: true
     },
    email: {
        type: String,
        // validate: [ isEmail, 'invalid email' ],
        required: true
     },
      password: { 
        type: String,
        // validate:[isStrongPassword , 'enter a strong password' ],
        required: true
     },
     id:{
         type:String
     }
});

const User = mongoose.model('User',UserSchema);

export default User;