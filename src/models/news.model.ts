import mongoose, { Schema } from 'mongoose';

interface INews {
    newsCategory: { categoryName: string };
    newsTitle: string;
    newsDescription: string;
    newsContent: string;
    newsImageUrl: string;
}

export interface INewsModel extends INews, Document {}

const NewsSchema: Schema = new Schema(
    {
        newsCategory: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CategoryModel' },
        newsTitle: { type: String, required: true },
        newsDescription: { type: String, required: false },
        newsContent: { type: String, required: true },
        newsImageUrl: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<INewsModel>('NewsModel', NewsSchema);
