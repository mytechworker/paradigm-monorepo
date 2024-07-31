import {
    modelOptions,
    Ref,
    pre,
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
    },
})
// @pre<Category>("save", async function(next) {
//   const filter = await CategoryModel.find()
//     .sort({ index: -1 })
//     .limit(1);

//   console.log(`filter index`, filter[0]);

//   if (filter.length > 0) {
//     this.index = filter[0].index + 1;
//   }

//   next();
// })
export class Category {
    @prop({ type: String, required: true })
    public title!: string;
    @prop({ type: String, required: true })
    public image!: string;
    @prop({ type: Number, default: 0, unique: true })
    public index!: number;
    // @prop({ type: Array<ObjectId>, required: false, ref: () => User })
    // public followingCategoryUsers!: Ref<User>;
}

const CategoryModel = getModelForClass(Category);

export default CategoryModel;
