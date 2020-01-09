'use strict';

import assert from 'assert';

assert(process.env.PORT !== undefined, 'A port number (PORT) is required.');
assert(process.env.SESSION_SECRET !== undefined, 'A secret for sessions (SESSION_SECRET) is required.');

import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}.`);
});
