import NotifyClient from 'notifications-node-client';
import config from '../config.js';
import {ReturnState} from './_base.js';

/**
 * Takes an issue date, calculates an expiry date based on that and converts it
 * in to a formatted string.
 *
 * @param {Date} issueDate when the registration is issued
 * @returns {String} a formatted date string
 */
const buildExpiryDateString = (issueDate) => {
  const expiryDateTime = new Date(issueDate);
  expiryDateTime.setFullYear(expiryDateTime.getFullYear() + 5);

  const d = String(expiryDateTime.getDate()).padStart(2, '0');
  const m = String(expiryDateTime.getMonth() + 1).padStart(2, '0');
  const y = String(expiryDateTime.getFullYear()).padStart(4, '0');

  return `${d}/${m}/${y}`;
};

const confirmController = async (req) => {
  const notifyClient = new NotifyClient.NotifyClient(config.notifyApiKey);

  // TODO: Replace with an API call that guarantees an unused ID.
  req.session.regNo = `NS-TRP-${String(Math.floor(Math.random() * Math.floor(9999))).padStart(4, '0')}`;

  req.session.registrationDateTime = new Date();
  req.session.expiryDate = buildExpiryDateString(req.session.registrationDateTime);

  try {
    // Send an email to the applicant, confirming their registration.
    await notifyClient.sendEmail('7b7a0810-a15d-4c72-8fcf-c1e7494641b3', 'traps@nature.scot', {
      personalisation: {
        regNo: req.session.regNo,
        convictions: req.session.conviction ? 'yes' : 'no',
        noConvictions: req.session.conviction ? 'no' : 'yes',
        general1: req.session.general1 ? 'yes' : 'no',
        noGeneral1: req.session.general1 ? 'no' : 'yes',
        general2: req.session.general2 ? 'yes' : 'no',
        noGeneral2: req.session.general2 ? 'no' : 'yes',
        general3: req.session.general3 ? 'yes' : 'no',
        noGeneral3: req.session.general3 ? 'no' : 'yes',
        comply: req.session.comply === 'yes' ? 'yes' : 'no',
        noComply: req.session.comply === 'yes' ? 'no' : 'yes',
        meatBait: req.session.meatBait ? 'yes' : 'no',
        noMeatBait: req.session.meatBait ? 'no' : 'yes',
        expiryDate: req.session.expiryDate
      },
      reference: req.session.regNo,
      emailReplyToId: '4a9b34d1-ab1f-4806-83df-3e29afef4165'
    });

    // Send an email to us, logging all their details.
    await notifyClient.sendEmail('59b7f2f3-b152-405a-9441-c8633fc45399', 'traps@nature.scot', {
      personalisation: {
        regNo: req.session.regNo,
        convictions: req.session.conviction ? 'yes' : 'no',
        general1: req.session.general1 ? 'yes' : 'no',
        general2: req.session.general2 ? 'yes' : 'no',
        general3: req.session.general3 ? 'yes' : 'no',
        comply: req.session.comply === 'yes' ? 'yes' : 'no',
        meatBait: req.session.meatBait ? 'yes' : 'no',
        fullName: req.session.fullName,
        addressLine1: req.session.addressLine1,
        addressLine2: req.session.addressLine2,
        addressTown: req.session.addressTown,
        addressCounty: req.session.addressCounty,
        addressPostcode: req.session.addressPostcode,
        phoneNumber: req.session.phoneNumber,
        emailAddress: req.session.emailAddress,
        registrationDateTime: req.session.registrationDateTime.toISOString()
      },
      reference: req.session.regNo,
      emailReplyToId: '4a9b34d1-ab1f-4806-83df-3e29afef4165'
    });

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
