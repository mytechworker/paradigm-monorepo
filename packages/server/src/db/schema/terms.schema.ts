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
        collection: 'terms',
    },
})
export class Terms {
    @prop({ type: String, required: true })
    public content!: string;
    @prop({ type: String, default: 'admin' })
    public role!: string;
}

const TermsModel = getModelForClass(Terms);

export default TermsModel;
