import fs from 'node:fs';
import path from 'node:path';

const comparePaths = (a, b) => {
  if (a.path === b.path) {
    return 0;
  }
  return a.path < b.path ? -1 : 1;
};

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
  .sort(comparePaths);

export default listFiles;
