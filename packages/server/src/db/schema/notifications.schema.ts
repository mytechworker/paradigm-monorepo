import {
    modelOptions,
    Ref,
    prop,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';
import { Article } from './articles.schema';
import { Company } from './companies.schema';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'notification',
        expires: 60 * 60 * 24 * 7, // after 7 days
    },
})
export class Notification {
    @prop({ type: Array<Ref<Company>>, required: false, ref: () => Company })
    public companyId!: Ref<Company>;
    @prop({ type: Array<Ref<Article>>, required: false, ref: () => Article })
    public articleId!: Ref<Article>;
}

const NotificationModel = getModelForClass(Notification);

export default NotificationModel;
