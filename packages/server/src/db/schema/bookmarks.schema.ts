import {
    modelOptions,
    prop,
    Severity,
    getModelForClass,
    Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Article } from './articles.schema';
import { User } from './users.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'bookmark',
    },
})
export class Bookmark {
    @prop({ type: Types.ObjectId })
    public user_id!: Ref<User>;
    @prop({ type: Types.ObjectId })
    public article_id!: Ref<Article>;
    @prop({ type: Boolean, required: false })
    public isUpdated!: boolean;
}

const BookmarkModel = getModelForClass(Bookmark);

export default BookmarkModel;
