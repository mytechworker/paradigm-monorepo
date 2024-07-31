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
        collection: 'about',
    },
})
export class AboutUs {
    @prop({ type: String, required: true })
    public content!: string;

    @prop({ type: String, required: false, default: 'admin' })
    public role!: string;
}

const AboutUsModel = getModelForClass(AboutUs);

export default AboutUsModel;
