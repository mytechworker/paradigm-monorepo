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
        collection: 'privacy',
    },
})
export class Privacy {
    @prop({ type: String, required: true })
    public content!: string;
    @prop({ type: String, required: false, default: 'privacy' })
    public role!: string;
}

const PrivacyModel = getModelForClass(Privacy);

export default PrivacyModel;
