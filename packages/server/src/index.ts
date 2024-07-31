import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

import app from './app';
import checkifFoldersExists from './utils/checkIfFoldersExists';
import connectDatabase from './db/connection';

import config from './config/default';

const privateKey = fs.readFileSync(
    path.join(__dirname, 'certificates', 'privkey.pem'),
    'utf8'
);
const certificate = fs.readFileSync(
    path.join(__dirname, 'certificates', 'cert.pem')
);
const ca = fs.readFileSync(
    path.join(__dirname, 'certificates', 'paradigmresear_ch.ca-bundle')
);

const configs = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};

const server = http.createServer(app);
const serverHttps = https.createServer(
    {
        rejectUnauthorized: false,
        ...configs,
    },
    app
);

if (process.env.NODE_ENV === 'development') {
    server.listen(config.port, async () => {
        console.log(`Server running on port ${config.port}`);
        console.log(`running mode: ${process.env.NODE_ENV}`);

        checkifFoldersExists([
            'users',
            'authors',
            'collections',
            'articles',
            'banners',
            'category_images',
        ]);

        await connectDatabase();
    });
} else {
    serverHttps.listen(config.port, async () => {
        console.log(`Server running on port ${config.port}`);
        console.log(`running mode: ${process.env.NODE_ENV}`);

        checkifFoldersExists([
            'users',
            'authors',
            'collections',
            'articles',
            'banners',
            'category_images',
        ]);

        await connectDatabase();
    });
}
