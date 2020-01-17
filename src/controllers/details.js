import {ReturnState} from './_base.js';

const detailsController = (req) => {
  // Grab all of the values from the form post.
  req.session.fullName = req.body.fullName;
  req.session.addressLine1 = req.body.addressLine1;
  req.session.addressLine2 = req.body.addressLine2;
  req.session.addressTown = req.body.addressTown;
  req.session.addressCounty = req.body.addressCounty;
  req.session.addressPostcode = req.body.addressPostcode;
  req.session.phoneNumber = req.body.phoneNumber;
  req.session.emailAddress = req.body.emailAddress;

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
