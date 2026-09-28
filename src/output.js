import fs from 'node:fs';
import path from 'node:path';

const isInside = (parent, child) => {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return !relative.startsWith('..') && !path.isAbsolute(relative);
};

const writeOutput = (folder, outDir, fileName, content) => {
  if (isInside(folder, outDir)) {
    throw new Error(`папка результата ${outDir} лежит внутри папки компании ${folder}`);
  }
  fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, fileName);
  fs.writeFileSync(filePath, content);
  return filePath;
};

export default writeOutput;
