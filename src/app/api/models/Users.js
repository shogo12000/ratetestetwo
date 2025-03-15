import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    salt: { type: String, required: true },
});

const User = mongoose.models.UserStudent || mongoose.model('UserStudent', UserSchema);

export default User;