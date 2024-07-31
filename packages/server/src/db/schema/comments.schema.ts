import {
    modelOptions,
    prop,
    Severity,
    getModelForClass,
    Ref,
} from '@typegoose/typegoose';

import { Types } from 'mongoose';

import { Article } from './articles.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'comments',
    },
})
export class Comment {
    @prop({ type: String, required: true })
    public comment!: string;
    @prop({ type: Number, default: 0 })
    public commentCounts!: number;
    @prop({ type: Types.ObjectId, required: true })
    public articleId!: Ref<Article>;
}

const CommentModel = getModelForClass(Comment);

export default CommentModel;
