'use strict';

import assert from 'assert';
import app from './app.js';

assert(process.env.PORT !== undefined, 'A port number (PORT) is required.');

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}.`);
});
