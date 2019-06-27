// Import modules
import mongoose, { Schema, Document } from 'mongoose';
import mongooseBcrypt from 'mongoose-bcrypt';

// Define Interface
interface IUser extends Document {
    firstName: String,
    lastName: String,
    photo: String,
    email: String,
    password?: String,
    description: String,
    skills: JSON,
    information: JSON
}

// Define Schema
let UserSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    photo: String,
    email: String,
    password: String,
    description: String,
    skills: JSON,
    information: JSON
},{
    timestamps: true
})

UserSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', UserSchema);

export { User, IUser };
export default User;