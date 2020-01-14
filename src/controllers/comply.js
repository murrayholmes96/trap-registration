import {ReturnState} from './_base.js';

const complyController = (req) => {
  // Did the user tell us they'll comply with the terms.
  if (req.body.comply === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    req.session.complyError = false;
    // Save the decision.
    req.session.comply = req.body.comply;
    // Follow the 'happy path'.
    return ReturnState.Positive;
  }

  // Did the user tell us they won't comply with the terms.
  if (req.body.comply === 'no') {
    // It's a silly answer, but not an error. This clears any previous errors.
    req.session.complyError = false;
    // Save the decision.
    req.session.comply = req.body.comply;
    // Go down the 'STOP' path.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error!
  req.session.complyError = true;
  // Unset any saved value.
  req.session.comply = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {complyController as default};
