import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import path from 'path';

import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

import {
    authRoutes,
    userRoutes,
    categoryRoutes,
    companyRoutes,
    articleRoutes,
} from './routes';

import config from './config/default';

const app = express();

const allowed_origins = [
    'http://localhost:3000',
    'https://paradigmresear.ch',
    'https://www.paradigmresear.ch',
];

const corsOptions: CorsOptions = {
    origin: allowed_origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(config.api_prefix.concat('/auth'), authRoutes);
app.use(config.api_prefix.concat('/user'), userRoutes);
app.use(config.api_prefix.concat('/category'), categoryRoutes);
app.use(config.api_prefix.concat('/company'), companyRoutes);
app.use(config.api_prefix.concat('/article'), articleRoutes);

app.use('*', (req, res) => res.send('invalid route!'));

app.use(errorHandlerMiddleware);

export default app;
