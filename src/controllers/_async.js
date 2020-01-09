import { ReturnState } from './_sync.js';

const Controller = (options) => {
    const router = require('express').Router()

    router.get('*', (req, res) => {
        res.render(options.template, {
            backUrl: options.backUrl,
            model: req.session
        });
    });

    router.post('*', async (req, res) => {
        try {
            const decision = await options.decision(req);
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
        } catch(e) {
            console.error(e);
        }
    });

    return router;
}

export { ReturnState, Controller };
