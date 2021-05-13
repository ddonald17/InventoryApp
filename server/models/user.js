import mongoose from 'mongoose';
import { isEmail, isStrongPassword } from 'validator';


const UserSchema = mongoose.Schema({
    username: {  
        type: String,
        required: true
     },
    email: {
        type: String,
        validate: [ isEmail, 'invalid email' ],
        required: true
     },
      password: { 
        type: String,
        validate:[isStrongPassword , 'enter a strong password' ],
        required: true
     }
});

const User = mangoose.model('User',UserSchema);

export default User;