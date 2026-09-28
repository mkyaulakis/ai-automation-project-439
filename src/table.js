import fs from 'node:fs';
import { parseCsv, stripBom } from './csv.js';

const toText = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
};

const parseJson = (text) => {
  const data = JSON.parse(text);
  const items = (Array.isArray(data) ? data : [data])
    .filter((item) => item !== null && typeof item === 'object' && !Array.isArray(item));
  const columns = [...new Set(items.flatMap((item) => Object.keys(item)))];
  const rows = items.map((item) => Object.fromEntries(
    columns.map((column) => [column, toText(item[column])]),
  ));
  return { columns, rows };
};

const readTable = (file) => {
  const text = fs.readFileSync(file.path, 'utf8');
  if (file.ext !== '.json') {
    return parseCsv(text);
  }
  try {
    return parseJson(stripBom(text));
  } catch {
    return { columns: [], rows: [] };
  }
};

export default readTable;
