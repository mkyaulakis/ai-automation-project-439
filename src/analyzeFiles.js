import fs from 'node:fs';
import { createHash } from 'node:crypto';
import listFiles from './walk.js';
import readTable from './table.js';
import findDuplicateGroups from './duplicates.js';
import { detectStatus, detectType } from './detect.js';
import { HASH_ALGORITHM } from './config.js';

const countBy = (items, key, values) => Object.fromEntries(
  values.map((value) => [value, items.filter((item) => item[key] === value).length]),
);

const describeTable = (file) => {
  if (file.type !== 'table') {
    return { columns: [], rows: [], rowCount: 0 };
  }
  const { columns, rows } = readTable(file);
  return { columns, rows, rowCount: rows.length };
};

const describeFile = (file) => {
  const content = fs.readFileSync(file.path);
  const type = detectType(file.ext, content);
  const described = {
    ...file,
    type,
    status: detectStatus(file, type),
    hash: createHash(HASH_ALGORITHM).update(content).digest('hex'),
  };
  return { ...described, ...describeTable(described) };
};

const linkPrimaries = (files, groups) => {
  const primaryByPath = new Map(groups.flatMap(({ primary, copies }) => (
    copies.map((copy) => [copy.path, primary.path])
  )));
  return files.map((file) => ({ ...file, primary: primaryByPath.get(file.path) ?? '' }));
};

const analyzeFiles = (folder) => {
  const described = listFiles(folder).map(describeFile);
  const duplicates = findDuplicateGroups(described);
  const files = linkPrimaries(described, duplicates);
  return {
    files,
    duplicates,
    summary: {
      total: files.length,
      types: countBy(files, 'type', ['table', 'text', 'binary']),
      statuses: countBy(files, 'status', ['document', 'manual', 'foreign']),
      copies: duplicates.reduce((sum, group) => sum + group.copies.length, 0),
      groups: duplicates.length,
    },
  };
};

export default analyzeFiles;
