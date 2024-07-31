import {
    modelOptions,
    prop,
    Severity,
    getModelForClass,
    Ref,
} from '@typegoose/typegoose';
import { ObjectId, Types } from 'mongoose';

import { Article } from './articles.schema';
import { User } from './users.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
    },
})
export class Collection {
    @prop({ type: String, required: true })
    public title!: string;
    @prop({ type: String, required: false })
    public description!: string;
    @prop({ type: String })
    public image!: string;
    @prop({ type: Types.ObjectId })
    public userId!: Ref<User>;
    @prop({ type: Array<ObjectId> })
    public articles_id!: Array<Ref<Article>>;
}

const CollectionModel = getModelForClass(Collection);

export default CollectionModel;
