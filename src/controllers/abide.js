import {ReturnState} from './_base.js';

const abideController = (req) => {
  // Did the user tell us they'll comply with the terms.
  if (req.body.abide === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    req.session.abideError = false;
    // Save the decision.
    req.session.abide = req.body.abide;
    // Follow the 'happy path'.
    return ReturnState.Positive;
  }

  // Did the user tell us they won't comply with the terms.
  if (req.body.abide === 'no') {
    // It's a silly answer, but not an error. This clears any previous errors.
    req.session.abideError = false;
    // Save the decision.
    req.session.abide = req.body.abide;
    // Go down the 'STOP' path.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error!
  req.session.abideError = true;
  // Unset any saved value.
  req.session.abide = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {abideController as default};
