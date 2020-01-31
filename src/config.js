import assert from 'assert';

// Declare up front what env vars we need to continue and ensure they're set.
assert(process.env.PORT !== undefined, 'A port number (PORT) is required.');
assert(process.env.SESSION_SECRET !== undefined, 'A secret for sessions (SESSION_SECRET) is required.');
assert(process.env.NOTIFY_API_KEY !== undefined, 'An API Key for GOV.UK Notify (NOTIFY_API_KEY) is required.');

const config = Object.freeze({
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  notifyApiKey: process.env.NOTIFY_API_KEY,
  pathPrefix: process.env.PATH_PREFIX || ''
});

export {config as default};
