import {
    modelOptions,
    prop,
    Ref,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { User } from './users.schema';
import { Category } from './categories.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'followingCategory',
    },
})
export class FollowingCategory {
    @prop({ type: Types.ObjectId, required: false, ref: () => User })
    public userId!: Ref<User>;

    @prop({ type: Types.ObjectId, required: false, ref: () => Category })
    public categoryId!: Ref<Category>;
}

const FollowingCategoryModel = getModelForClass(FollowingCategory);

export default FollowingCategoryModel;
