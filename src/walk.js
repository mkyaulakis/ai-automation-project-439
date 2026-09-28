import fs from 'node:fs';
import path from 'node:path';
import { comparePaths } from './paths.js';

const listFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => {
    const filePath = path.join(dir, entry.name);
    return {
      path: filePath,
      name: entry.name,
      ext: path.extname(entry.name).toLowerCase(),
      size: fs.statSync(filePath).size,
    };
  })
  .sort((a, b) => comparePaths(a.path, b.path));

export default listFiles;
