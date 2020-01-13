'use strict';

import assert from 'assert';

// Declare up front what env vars we need to continue and ensure they're set.
assert(process.env.PORT !== undefined, 'A port number (PORT) is required.');
assert(process.env.SESSION_SECRET !== undefined, 'A secret for sessions (SESSION_SECRET) is required.');
assert(process.env.NOTIFY_API_KEY !== undefined, 'An API Key for GOV.UK Notify (NOTIFY_API_KEY) is required.');

// Load the app.
import app from './app.js';

// Run it.
app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}.`);
});
