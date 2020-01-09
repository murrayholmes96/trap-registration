import express from 'express';
import morgan from 'morgan';
import logger from './logger.js';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.get('/', (req, res) => res.send('Hello World!'));

export { app as default };
