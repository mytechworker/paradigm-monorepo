import {
    modelOptions,
    pre,
    prop,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';

@pre<Slider>('save', async function (next) {
    const getNextIndex = async () => {
        let index: Number = await SliderModel.find({})
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
        collection: 'slider',
    },
})
export class Slider {
    @prop({ type: String, required: true })
    public title!: string;
    @prop({ type: String })
    public description!: string;
    @prop({ type: String })
    public image!: string;
    @prop({ type: String })
    public url!: string;
    @prop({ type: String })
    public buttontext!: string;
    @prop({ type: Number })
    public index!: number;
}

const SliderModel = getModelForClass(Slider);

export default SliderModel;
