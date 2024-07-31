import {
    modelOptions,
    prop,
    Severity,
    getModelForClass,
    Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Company } from './companies.schema';
import { Category } from './categories.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'articles',
    },
})
export class Article {
    @prop({ type: String, required: true })
    public title!: string;
    @prop({ type: String, required: true })
    public description!: string;
    @prop({ type: String, required: false })
    public image!: string;
    @prop({ type: String, required: true })
    public content!: string;
    @prop({ type: Types.ObjectId, ref: () => Company })
    public company!: Ref<Company>;
    @prop({ type: Types.ObjectId, ref: () => Category })
    public categories!: Ref<Category>;
    @prop({ type: String })
    public authorName!: string;
    @prop({ type: String })
    public authorImage!: string;
    @prop({ type: Number })
    public readtime!: number;
    @prop({ type: Boolean, default: false })
    public status!: boolean;
    @prop({ type: Array<string>, required: true })
    public tags!: string[];
    @prop({ type: Date, required: true })
    public dateOfPublish!: Date;
}

const ArticleModel = getModelForClass(Article);

export default ArticleModel;
