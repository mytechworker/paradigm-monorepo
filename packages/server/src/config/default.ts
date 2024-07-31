import path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '../../.env.local') });

export default {
    port: process.env.PORT || 7000,

    client_url:
        process.env.NODE_ENV === 'production'
            ? (process.env.CLIENT_URL as string)
            : 'http://localhost:3000',
    api_url:
        process.env.NODE_ENV === 'production'
            ? (process.env.API_URL as string)
            : 'http://localhost:7000',

    api_prefix: '/api/v1',

    secrectKey: process.env.JWT_SECRET as string,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

    backendRootPath: __dirname,

    mongo_uri:
        process.env.NODE_ENV === 'production'
            ? (process.env.MONGO_URI as string)
            : 'mongodb://localhost:27017/newParadigmDB',

    hostEmail: process.env.HOST_SMTP_EMAIL || 'dj.sparkle003@gmail.com',
    hostPassword: process.env.HOST_SMTP_PASSWORD || 'fiiidjhtreshxnbu',
    hostName: process.env.HOST_SMTP_NAME || 'smtp.gmail.com',
    serviceName: process.env.HOST_SMTP_SERVICE_NAME || 'gmail',
    hostPort: process.env.HOST_SMTP_PORT || 465,
};
