import {ReturnState} from './_base.js';

const generalController = (req) => {
  // The user submitted the form without selecting an option.
  if (req.body.general === undefined) {
    // This is an error!
    req.session.generalError = true;
    // Unset any saved value.
    req.session.general1 = false;
    req.session.general2 = false;
    req.session.general3 = false;
    // Reload the page to highlight errors.
    return ReturnState.Error;
  }

  // The user submitted a single value
  if (['general1', 'general2', 'general3'].includes(req.body.general)) {
    // This is not an error.
    req.session.generalError = false;
    // Unset any saved value.
    req.session.general1 = false;
    req.session.general2 = false;
    req.session.general3 = false;
    // Check the submitted value.
    if (req.body.general === 'general1') {
      req.session.general1 = true;
    }

    if (req.body.general === 'general2') {
      req.session.general2 = true;
    }

    if (req.body.general === 'general3') {
      req.session.general3 = true;
    }

    // Continue onwards.
    return ReturnState.Positive;
  }

  // The user submitted a number of values
  if (req.body.general.length > 0) {
    // Unset any saved value.
    req.session.general1 = false;
    req.session.general2 = false;
    req.session.general3 = false;
    // Check for each of the submitted values.
    if (req.body.general.includes('general1')) {
      req.session.general1 = true;
    }

    if (req.body.general.includes('general2')) {
      req.session.general2 = true;
    }

    if (req.body.general.includes('general3')) {
      req.session.general3 = true;
    }

    // Make sure the user's made at least one selection.
    const atLeastOne = req.session.general1 || req.session.general2 || req.session.general3;
    if (atLeastOne) {
      // This is not an error.
      req.session.generalError = false;
      // So continue.
      return ReturnState.Positive;
    }

    // The user submitted a list of values, but they didn't match any of
    // the values we expected, this is an error!
    req.session.generalError = true;
    // Unset any saved value.
    req.session.general1 = false;
    req.session.general2 = false;
    req.session.general3 = false;
    // Reload the page to highlight errors.
    return ReturnState.Error;
  }

  // The user submitted something that doesn't make sense.
  // This is an error!
  req.session.generalError = true;
  // Unset any saved value.
  req.session.general1 = false;
  req.session.general2 = false;
  req.session.general3 = false;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {generalController as default};
