import assert from 'assert';

// Declare up front what env vars we need to continue and ensure they're set.
assert(process.env.TR_PORT !== undefined, 'A port number (TR_PORT) is required.');
assert(process.env.TR_SESSION_SECRET !== undefined, 'A secret for sessions (TR_SESSION_SECRET) is required.');
assert(process.env.TR_API_URL !== undefined, 'A URL for the trap-registration-api service (TR_API_URL) is required.');

const config = Object.freeze({
  port: process.env.TR_PORT,
  sessionSecret: process.env.TR_SESSION_SECRET,
  apiEndpoint: process.env.TR_API_URL,
  hostPrefix: process.env.TR_HOST_PREFIX ? `${process.env.TR_HOST_PREFIX}` : `http://localhost:${process.env.TR_PORT}`,
  pathPrefix: process.env.TR_PATH_PREFIX ? `/${process.env.TR_PATH_PREFIX}` : '/trap-registration',
  cookiePrefix: process.env.COOKIE_PREFIX || '__Secure'
});

export {config as default};
