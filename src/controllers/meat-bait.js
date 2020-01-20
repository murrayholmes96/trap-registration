import {ReturnState} from './_base.js';

const meatBaitController = (req) => {
  // Did the user tell us they're not using meat baits.
  if (req.body.meatbait === 'no') {
    // Then we don't have any errors. This clears any previous errors.
    req.session.meatBaitError = false;
    // Save the decision.
    req.session.meatBait = false;
    // Follow the negative path (actually the same direction as positive).
    return ReturnState.Negative;
  }

  // Did the user tell us they are using meat baits.
  if (req.body.meatbait === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    req.session.meatBaitError = false;
    // Save the decision.
    req.session.meatBait = true;
    // Follow the positive path (actually the same direction as negative).
    return ReturnState.Positive;
  }

  // The user submitted the form without selecting an option, this is an error!
  req.session.meatBaitError = true;
  // Unset any saved value.
  req.session.meatBait = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {meatBaitController as default};
