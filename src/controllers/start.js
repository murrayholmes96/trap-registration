import {ReturnState} from './_base.js';

const startController = (req) => {

  req.session.seenCookie = true;

  // The only way out of the start page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {startController as default};
