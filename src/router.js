import express from 'express';
const router = express.Router();

// Import all the controllers.
import gdpr from './controllers/gdpr.js';

router.get('/start', (req, res) => {
    req.session.destroy();
    res.render('start.njk');
});

// Mount all the controllers and 'no' routes.
router.use('/gdpr', gdpr);

export { router as default };
