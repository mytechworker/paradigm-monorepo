import { faker } from '@faker-js/faker';

import {
    AboutUsModel,
    ArticlesModel,
    BookmarksModel,
    CategoriesModel,
    CollectionsModel,
    CommentsModel,
    CompanyModel,
    FollowingCategoryModel,
    FollowingModel,
    NotificationsModel,
    PrivacyModel,
    ResetKeyModel,
    SliderModel,
    TermModel,
    UserModel,
    UserNotification,
} from './schema';

const seedDatabase = async () => {
    const users = await UserModel.find();

    if (users.length === 0) {
        const user = await UserModel.create({
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
            image: faker.internet.avatar(),
            bannerImage: faker.image.url(),
            bio: faker.lorem.paragraph(),
            role: 'admin',
            privacy: true,
        });

        const aboutUs = await AboutUsModel.create({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
        });

        const categories = await CategoriesModel.create({
            title: faker.lorem.sentence(),
            image: faker.image.urlLoremFlickr(),
            index: faker.number.int(),
        });

        const company = await CompanyModel.create({
            name: faker.company.name(),
            description: faker.lorem.paragraph(),
            bannerImage: faker.image.url(),
            image: faker.image.url(),
            totalFollowers: faker.number.int(),
            index: faker.number.int(),
            numArr: Array.from({ length: 10 }, () => faker.number.int()),
            followingCompanyUsers: [user._id],
        });

        const articles = await ArticlesModel.create({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            image: faker.image.urlLoremFlickr(),
            categories: [categories._id],
            authorName: faker.person.fullName(),
            authorImage: faker.image.avatar(),
            authorId: user._id,
            dateOfPublish: faker.date.past(),
            description: faker.lorem.paragraph(),
            readtime: faker.number.int(),
            status: true,
            tags: [faker.lorem.word()],
            company: company._id,
        });
    }
};

seedDatabase();
