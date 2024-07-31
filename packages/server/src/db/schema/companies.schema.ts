import {
    modelOptions,
    Ref,
    pre,
    prop,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { User } from './users.schema';

// Function to Auto Index Draggable List
@pre<Company>('save', async function (next) {
    const getNextIndex = async () => {
        let index: Number = await CompanyModel.find({})
            .sort({ index: -1 })
            .limit(1)
            .then((maxindex: any) => {
                if (!(maxindex.length > 0)) {
                    return 0;
                } else {
                    let t: Number = maxindex[0].index + 1;
                    return t;
                }
            });
        return index;
    };

    let index = await getNextIndex();
    this.index = index as unknown as number;

    next();
})
@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
    },
})
export class Company {
    @prop({ type: String, required: true, unique: true })
    public name!: string;
    @prop({ type: String, required: false })
    public description!: string;
    @prop({ type: String, required: false })
    public image!: string;
    @prop({ type: String, required: false })
    public bannerImage!: string;
    @prop({ type: Number, required: false, unique: true })
    public index!: number;
    @prop({ type: Array<Object>, required: true })
    public numArr!: object[];
    @prop({
        type: Array<Ref<User>>,
        required: false,
        ref: () => User,
    })
    public followingCompanyUsers!: Ref<User>[];
    @prop({ type: Number, default: 0 })
    public totalFollowers!: number;
}

const CompanyModel = getModelForClass(Company);

export default CompanyModel;
