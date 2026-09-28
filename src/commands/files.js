import fs from 'node:fs';
import listFiles from '../walk.js';
import { detectStatus, detectType } from '../detect.js';

const countBy = (items, key, values) => Object.fromEntries(
  values.map((value) => [value, items.filter((item) => item[key] === value).length]),
);

const describeFile = (file) => {
  const content = fs.readFileSync(file.path);
  const type = detectType(file.ext, content);
  return { ...file, type, status: detectStatus(file, type) };
};

const runFiles = (folder) => {
  const files = listFiles(folder).map(describeFile);
  return {
    files,
    summary: {
      total: files.length,
      types: countBy(files, 'type', ['table', 'text', 'binary']),
      statuses: countBy(files, 'status', ['document', 'manual', 'foreign']),
    },
  };
};

export default runFiles;
