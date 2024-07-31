import {
    modelOptions,
    prop,
    Severity,
    getModelForClass,
    Ref,
} from '@typegoose/typegoose';

import { Types } from 'mongoose';

import { User } from './users.schema';
import { Article } from './articles.schema';
import { Company } from './companies.schema';
import { Category } from './categories.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'userNotification',
    },
})
export class UserNotification {
    @prop({ type: Types.ObjectId, required: true, ref: () => Article })
    public articleId!: Ref<Article>;
    @prop({ type: Types.ObjectId, required: true, ref: () => User })
    public userId!: Ref<User>;
    @prop({ type: Types.ObjectId, required: true, ref: () => Company })
    public companyId!: Ref<Company>;
    @prop({ type: Types.ObjectId, required: true, ref: () => Category })
    public categoryId!: Ref<Category>;
    @prop({ type: String, required: false })
    public title!: string;
    @prop({ type: Boolean, required: false })
    public isRead!: boolean;
}

const UserNotificationModel = getModelForClass(UserNotification);

export default UserNotificationModel;
