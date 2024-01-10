import mongoose, { Document, Schema } from 'mongoose';

export interface ITemplate {
    something: string;
}

export interface ITemplateModel extends ITemplate, Document {}

const TemplateScheema: Schema = new Schema(
    {
        something: { type: String, required: true }
    },
    { versionKey: false }
);

export default mongoose.model<ITemplateModel>('Template', TemplateScheema);
