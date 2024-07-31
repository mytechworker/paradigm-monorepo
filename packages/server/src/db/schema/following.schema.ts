import {
    modelOptions,
    prop,
    Ref,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { User } from './users.schema';
import { Company } from './companies.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'following',
    },
})
export class Following {
    @prop({ type: Types.ObjectId, required: false, ref: () => User })
    public userId!: Ref<User>;

    @prop({ type: Types.ObjectId, required: false, ref: () => Company })
    public companyId!: Ref<Company>;
}

const FollowingModel = getModelForClass(Following);

export default FollowingModel;
