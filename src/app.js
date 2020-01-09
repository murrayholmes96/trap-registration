import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import session from 'express-session';
import memorystore from 'memorystore';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import logger from './logger.js';
import router from './router.js';

const MemoryStore = memorystore(session);
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('combined', { stream: logger.stream }));

nunjucks.configure(['src/views','node_modules/govuk-frontend'], {
  autoescape: true,
  express: app
});

app.use(session({
  cookie: { maxAge: 30 * 60 * 1000 },
  store: new MemoryStore({
    checkPeriod: 30 * 60 * 1000
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use('/dist', express.static(path.join(__dirname, '..', '/dist')))
app.use('/govuk-frontend', express.static(path.join(__dirname, '..', '/node_modules/govuk-frontend/govuk')))
app.use('/assets', express.static(path.join(__dirname, '..', '/node_modules/govuk-frontend/govuk/assets')))

app.use('/', router);

export { app as default };
