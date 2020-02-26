import axios from 'axios';
import config from '../config.js';
import {ReturnState} from './_base.js';

const confirmController = async (req) => {
  try {
    const newRegResponse = await axios.post(config.apiEndpoint);
    const newReg = {
      convictions: req.session.conviction,
      usingGL01: req.session.general1,
      usingGL02: req.session.general2,
      usingGL03: req.session.general3,
      complyWithTerms: req.session.comply === 'yes',
      meatBaits: req.session.meatBait,
      fullName: req.session.fullName,
      addressLine1: req.session.addressLine1,
      addressLine2: req.session.addressLine2,
      addressTown: req.session.addressTown,
      addressCounty: req.session.addressCounty,
      addressPostcode: req.session.addressPostcode,
      phoneNumber: req.session.phoneNumber,
      emailAddress: req.session.emailAddress
    };
    const newRegUrl = newRegResponse.headers.location;
    const updatedRegResponse = await axios.put(newRegUrl, newReg);

    req.session.regNo = updatedRegResponse.data.regNo;
    req.session.expiryDate = updatedRegResponse.data.expiryDate;

    // Let them know it all went well.
    return ReturnState.Positive;
  } catch (error) {
    // TODO: Do something useful with this error.
    console.log(error);

    // Let the user know it went wrong, and to 'probably' try again?
    return ReturnState.Error;
  }
};

export {confirmController as default};
