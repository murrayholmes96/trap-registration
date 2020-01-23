'use strict';

import {readFileSync, writeFileSync} from 'fs';

const lines = readFileSync('src/main.scss')
  .toString()
  .split('\n');

for (const l in lines) {
  if (lines[l].startsWith('$path-prefix:')) {
    lines[l] = `$path-prefix: '${process.env.PATH_PREFIX || ''}';`;
  }
}

writeFileSync('build/main.scss', lines.join('\n'));
