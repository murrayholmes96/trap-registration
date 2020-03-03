import {ReturnState} from './_base.js';

/**
 * Clean the incoming POST request body to make it more compatible with the
 * database and its validation rules.
 *
 * @param {any} body the incoming request's body
 * @returns {any} a json object that's just got our cleaned up fields on it
 */
const cleanInput = (body) => {
  return {
    // The strings are trimmed for leading and trailing whitespace and then
    // copied across if they're in the POST body or are set to undefined if
    // they're missing.
    fullName: body.fullName === undefined ? undefined : body.fullName.trim(),
    addressLine1: body.addressLine1 === undefined ? undefined : body.addressLine1.trim(),
    addressLine2: body.addressLine2 === undefined ? undefined : body.addressLine2.trim(),
    addressTown: body.addressTown === undefined ? undefined : body.addressTown.trim(),
    addressCounty: body.addressCounty === undefined ? undefined : body.addressCounty.trim(),
    addressPostcode: body.addressPostcode === undefined ? undefined : body.addressPostcode.trim(),
    phoneNumber: body.phoneNumber === undefined ? undefined : body.phoneNumber.trim(),
    emailAddress: body.emailAddress === undefined ? undefined : body.emailAddress.trim()
  };
};

const detailsController = (req) => {
  // Clean up the user's input before we store it in the session.
  const cleanForm = cleanInput(req.body);
  req.session.fullName = cleanForm.fullName;
  req.session.addressLine1 = cleanForm.addressLine1;
  req.session.addressLine2 = cleanForm.addressLine2;
  req.session.addressTown = cleanForm.addressTown;
  req.session.addressCounty = cleanForm.addressCounty;
  req.session.addressPostcode = cleanForm.addressPostcode;
  req.session.phoneNumber = cleanForm.phoneNumber;
  req.session.emailAddress = cleanForm.emailAddress;

  // Clear the general error...
  req.session.detailsError = false;
  // ...and the specific errors.
  req.session.nameError = false;
  req.session.addressError = false;
  req.session.townError = false;
  req.session.postcodeError = false;
  req.session.phoneError = false;
  req.session.emailError = false;

  // Check if each of the fields is invalid.
  if (req.body.fullName === undefined || req.body.fullName.trim() === '') {
    req.session.nameError = true;
  }

  if (req.body.addressLine1 === undefined || req.body.addressLine1.trim() === '') {
    req.session.addressError = true;
  }

  if (req.body.addressTown === undefined || req.body.addressTown.trim() === '') {
    req.session.townError = true;
  }

  // The shortest UK postcode is 'N19GU'.
  // The longest should be something like 'IV30 6GR', but we're not going to
  // check for too much data at this time.
  if (
    req.body.addressPostcode === undefined ||
    req.body.addressPostcode.trim() === '' ||
    req.body.addressPostcode.trim().length < 5
  ) {
    req.session.postcodeError = true;
  }

  // The smallest, non-local, non-shortcode UK phone number is '08001111'.
  // The longest could be something like 	'+44 (01234) 567 890', but we're not
  // going to check for too much data at this time.
  if (
    req.body.phoneNumber === undefined ||
    req.body.phoneNumber.trim() === '' ||
    req.body.phoneNumber.trim().length < 8
  ) {
    req.session.phoneError = true;
  }

  if (
    req.body.emailAddress === undefined ||
    req.body.emailAddress.trim() === '' ||
    req.body.emailAddress.trim().includes(' ') ||
    !req.body.emailAddress.includes('@')
  ) {
    req.session.emailError = true;
  }

  // Check that any of the fields are invalid.
  req.session.detailsError =
    req.session.nameError ||
    req.session.addressError ||
    req.session.townError ||
    req.session.postcodeError ||
    req.session.phoneError ||
    req.session.emailError;

  // If we've seen an error in any of the fields, our visitor needs to go back
  // and fix them.
  if (req.session.detailsError) {
    return ReturnState.Error;
  }

  // Build the address array, ignoring any blank fields.
  const address = [];
  if (req.session.addressLine1 !== undefined && req.session.addressLine1.trim() !== '') {
    address.push(req.session.addressLine1);
  }

  if (req.session.addressLine2 !== undefined && req.session.addressLine2.trim() !== '') {
    address.push(req.session.addressLine2);
  }

  if (req.session.addressTown !== undefined && req.session.addressTown.trim() !== '') {
    address.push(req.session.addressTown);
  }

  if (req.session.addressCounty !== undefined && req.session.addressCounty.trim() !== '') {
    address.push(req.session.addressCounty);
  }

  if (req.session.addressPostcode !== undefined && req.session.addressPostcode.trim() !== '') {
    address.push(req.session.addressPostcode);
  }

  // Create the display versions of the visitors address and contact info.
  req.session.displayAddress = address.join('<br>');
  req.session.displayContact = `${req.session.phoneNumber}<br>${req.session.emailAddress}`;

  // The request passed all our validation, we've stored copies of everything we
  // need, so it's time to go on.
  return ReturnState.Positive;
};

export {detailsController as default};
