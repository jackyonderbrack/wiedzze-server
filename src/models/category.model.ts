import mongoose, { Document, Schema } from 'mongoose';

interface ICategory {
    categoryName: string;
}

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
    {
        categoryName: { type: String, required: true },  
    },
    { versionKey: false }
);
export default mongoose.model<ICategoryModel>('CategoryModel', CategorySchema);