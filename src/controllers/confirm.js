import axios from 'axios';
import config from '../config.js';
import {ReturnState} from './_base.js';

const confirmController = async (request) => {
  try {
    const newRegResponse = await axios.post(config.apiEndpoint);
    const newReg = {
      convictions: request.session.conviction,
      usingGL01: request.session.general1,
      usingGL02: request.session.general2,
      usingGL03: request.session.general3,
      complyWithTerms: request.session.comply === 'yes',
      meatBaits: request.session.meatBait,
      fullName: request.session.fullName,
      addressLine1: request.session.addressLine1,
      addressLine2: request.session.addressLine2,
      addressTown: request.session.addressTown,
      addressCounty: request.session.addressCounty,
      addressPostcode: request.session.addressPostcode,
      phoneNumber: request.session.phoneNumber,
      emailAddress: request.session.emailAddress
    };
    const newRegUrl = newRegResponse.headers.location;
    const updatedRegResponse = await axios.put(newRegUrl, newReg);

    request.session.regNo = updatedRegResponse.data.regNo;
    request.session.expiryDate = updatedRegResponse.data.expiryDate;

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
