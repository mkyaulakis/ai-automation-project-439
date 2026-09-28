import fs from 'node:fs';
import path from 'node:path';
import { comparePaths } from './paths.js';

const collectFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectFiles(filePath);
    }
    if (!entry.isFile()) {
      return [];
    }
    return [{
      path: filePath,
      name: entry.name,
      ext: path.extname(entry.name).toLowerCase(),
      size: fs.statSync(filePath).size,
    }];
  });

const listFiles = (dir) => collectFiles(dir).sort((a, b) => comparePaths(a.path, b.path));

export default listFiles;
