import mongoose, { Document, Schema } from 'mongoose';

interface IMedia {
    fileName: string;
    fileType: string;
    filePath: string;
}

export interface IMediaModel extends IMedia, Document {}

const MediaSchema: Schema = new Schema(
    {
        fileName: { type: String, required: true },
        fileType: { type: String, required: true },
        filePath: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<IMediaModel>('MediaModel', MediaSchema);
