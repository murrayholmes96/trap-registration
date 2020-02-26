import assert from 'assert';

// Declare up front what env vars we need to continue and ensure they're set.
assert(process.env.PORT !== undefined, 'A port number (PORT) is required.');
assert(process.env.SESSION_SECRET !== undefined, 'A secret for sessions (SESSION_SECRET) is required.');
assert(
  process.env.TRAP_API_URL !== undefined,
  'A URL for the trap-registration-api service (TRAP_API_URL) is required.'
);

const config = Object.freeze({
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  apiEndpoint: process.env.TRAP_API_URL,
  pathPrefix: process.env.PATH_PREFIX || ''
});

export {config as default};
