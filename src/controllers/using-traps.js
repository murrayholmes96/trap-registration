import {ReturnState} from './_base.js';

const usingTrapsController = (req) => {
  // Did the user tell us they're using or intending to use traps.
  if (req.body.usingTraps === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    req.session.usingTrapsError = false;
    // Save the decision.
    req.session.usingTraps = req.body.usingTraps;
    // Follow the 'happy path'.
    return ReturnState.Positive;
  }

  // Did the user tell us they're not using or intending to use traps.
  if (req.body.usingTraps === 'no') {
    // It's a silly answer, but we not an error. This clears any previous errors.
    req.session.usingTrapsError = false;
    // Save the decision.
    req.session.usingTraps = req.body.usingTraps;
    // Go down the 'STOP' path.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error!
  req.session.usingTrapsError = true;
  // Unset any saved value.
  req.session.usingTraps = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {usingTrapsController as default};
