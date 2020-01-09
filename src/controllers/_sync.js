import express from 'express';

const ReturnState = Object.freeze({
  Positive: 1,
  Negative: 2,
  Error: 3
});

const Controller = (options) => {
  const router = express.Router()

  router.get('*', (req, res) => {
      res.render(options.template, {
          backUrl: options.backUrl,
          model: req.session
      });
  });

  router.post('*', (req, res) => {
      const decision = options.decision(req);
      if (decision === ReturnState.Positive) {
          res.redirect(options.positiveForwardUrl);
      } else if (decision === ReturnState.Negative) {
          res.redirect(options.negativeForwardUrl);
      } else {
          res.render(options.template, {
              backUrl: options.backUrl,
              model: req.session
          });
      }
  });

  return router;
}

export { ReturnState, Controller };
