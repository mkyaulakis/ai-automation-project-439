import path from 'node:path';

export const comparePaths = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

export const pathDepth = (filePath) => filePath.split(path.sep).length;
