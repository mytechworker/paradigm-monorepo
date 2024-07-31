import mongoose from 'mongoose';
import config from '../config/default';

// mongoose.set("strictQuery", true);

const connectDatabase = async () => {
    const connect = await mongoose.connect(config.mongo_uri);

    if (connect) {
        console.log('MongoDB connection success');
    }

    mongoose.connection.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}`);

        process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`MongoDB disconnected`);

        process.exit(1);
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();

        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await mongoose.connection.close();

        process.exit(0);
    });

    process.on('SIGUSR2', async () => {
        await mongoose.connection.close();

        process.kill(process.pid, 'SIGUSR2');
    });

    process.on('uncaughtException', async () => {
        await mongoose.connection.close();

        process.exit(1);
    });

    process.on('unhandledRejection', async () => {
        await mongoose.connection.close();

        process.exit(1);
    });

    return connect;
};

export default connectDatabase;
