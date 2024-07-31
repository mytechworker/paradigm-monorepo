import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import UserModel, { User } from '../db/schema/users.schema';

import { User as CreateUser } from '../types/user.types';

class UserService {
    async getUser(query: FilterQuery<User>, options?: QueryOptions) {
        const user = await UserModel.findOne(query, {}, options);

        return user;
    }

    async getUserById(id: string) {
        const user = await UserModel.findById(id).select('+password');

        return user;
    }

    async getUsers(page: number, limit: number) {
        const _page = page || 1;
        const _limit = limit || 10;

        const skip = (_page - 1) * _limit;

        const users = await UserModel.find().skip(skip).limit(_limit);

        return users;
    }

    async countRecords() {
        return await UserModel.find().countDocuments();
    }

    async createUser(data: Partial<CreateUser>) {
        const user = await UserModel.create(data);

        return user;
    }

    async updateUser(
        id: string,
        data: UpdateQuery<User>,
        options?: QueryOptions
    ) {
        const user = await UserModel.findByIdAndUpdate(
            id,
            data,
            options
        ).lean();

        return user;
    }

    async deleteUser(id: string) {
        return await UserModel.findByIdAndDelete(id);
    }
}

export default UserService;
