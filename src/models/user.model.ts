import mongoose, { Document, Schema } from 'mongoose';

interface IUser {
    userName: string;
    userEmail: string;
    userPassword: string;
    isAdmin?: boolean;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        userName: { type: String, required: true },
        userEmail: { type: String, required: true },
        userPassword: { type: String, required: true },
        isAdmin: { type: Boolean, default: false }
    },
    { versionKey: false, timestamps: true }
);
export default mongoose.model<IUserModel>('UserModel', UserSchema);
