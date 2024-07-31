import {
    modelOptions,
    Ref,
    pre,
    prop,
    index,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';
import type { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { Company } from './companies.schema';

// save method to hash password while creating document
@pre<User>('save', async function (next) {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})
@index({ email: 1 })
@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
    schemaOptions: {
        timestamps: true,
        collection: 'users',
    },
})
export class User {
    @prop({ type: Boolean, default: false })
    public privacy!: boolean;
    @prop({ type: String, default: 'user' })
    public role!: string;
    @prop({ type: String, required: false })
    public firstname!: string;
    @prop({ type: String, required: false })
    public lastname!: string;
    @prop({ type: String, required: true, unique: true })
    public username!: string;
    @prop({ type: String, required: true, unique: true })
    public email!: string;
    @prop({ type: String, required: true, select: false })
    public password!: string;
    @prop({ type: String, required: false })
    public image!: string;
    @prop({ type: String, required: false })
    public bannerImage!: string;
    @prop({ type: Array<ObjectId>, required: false, ref: () => Company })
    public following_company!: Ref<Company>;
    @prop({ type: String, required: false, expires: 60 })
    public verificationToken?: string;
    @prop({ type: String, required: false })
    public oauth_id?: string;

    async comparePasswords(hashedPassword: string, password: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateVerificationToken() {
        const token = crypto.randomBytes(64).toString('hex');
        const hash = crypto.createHash('sha256').update(token).digest('hex');

        this.verificationToken = hash;

        return token;
    }
}

const UserModel = getModelForClass(User);

export default UserModel;
