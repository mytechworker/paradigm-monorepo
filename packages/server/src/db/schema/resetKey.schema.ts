import {
    modelOptions,
    prop,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'resetkey',
    },
})
export class FollowingCategory {
    @prop({ type: String, required: true })
    public userEmail!: string;

    @prop({ type: String, required: true })
    public key!: string;

    @prop({ type: Date, required: true })
    public expireDate!: Date;
}

const FollowingCategoryModel = getModelForClass(FollowingCategory);

export default FollowingCategoryModel;
