import express from 'express';
const router = express.Router();

// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import GdprController from './controllers/gdpr.js';
import UsingTrapsController from './controllers/using-traps.js';
import ComplyController from './controllers/comply.js';
import ConvictionController from './controllers/conviction.js';
import EligibleController from './controllers/eligible.js';
import GeneralController from './controllers/general.js';
import DetailsController from './controllers/details.js';
import ConfirmController from './controllers/confirm.js';

// Configure all of the pages and routes.

router.use(
  Page({
    path: 'start',
    positiveForward: 'gdpr',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'gdpr',
    back: 'start',
    positiveForward: 'using-traps',
    controller: GdprController
  })
);

router.use(
  Page({
    path: 'using-traps',
    back: 'gdpr',
    positiveForward: 'comply',
    negativeForward: 'no-using-traps',
    controller: UsingTrapsController
  })
);

router.use(
  Page({
    path: 'comply',
    back: 'using-traps',
    positiveForward: 'conviction',
    negativeForward: 'no-comply',
    controller: ComplyController
  })
);

router.use(
  Page({
    path: 'conviction',
    back: 'comply',
    positiveForward: 'eligible',
    negativeForward: 'no-conviction',
    controller: ConvictionController
  })
);

router.use(
  Page({
    path: 'eligible',
    back: 'conviction',
    positiveForward: 'general',
    controller: EligibleController
  })
);

router.use(
  Page({
    path: 'general',
    back: 'eligible',
    positiveForward: 'details',
    controller: GeneralController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'general',
    positiveForward: 'confirm',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'confirm',
    back: 'details',
    positiveForward: 'success',
    controller: ConfirmController
  })
);

router.use(
  Page({
    path: 'success',
    back: 'details'
  })
);

router.use(
  Page({
    path: 'no-using-traps',
    back: 'using-traps'
  })
);

router.use(
  Page({
    path: 'no-comply',
    back: 'comply'
  })
);

router.use(
  Page({
    path: 'no-conviction',
    back: 'conviction'
  })
);

export {router as default};
