import { CSV_DELIMITERS } from './config.js';

const BOM = '﻿';

export const stripBom = (text) => (text.startsWith(BOM) ? text.slice(BOM.length) : text);

const detectDelimiter = (text) => {
  const [header] = text.split('\n');
  const counts = CSV_DELIMITERS.map((delimiter) => header.split(delimiter).length);
  return CSV_DELIMITERS[counts.indexOf(Math.max(...counts))];
};

const splitRecords = (text, delimiter) => {
  const records = [];
  let record = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === delimiter) {
      record.push(field);
      field = '';
    } else if (char === '\n') {
      records.push([...record, field]);
      record = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }
  return [...records, [...record, field]];
};

export const parseCsv = (rawText) => {
  const text = stripBom(rawText);
  const records = splitRecords(text, detectDelimiter(text))
    .filter((record) => record.some((value) => value.trim() !== ''));
  if (records.length === 0) {
    return { columns: [], rows: [] };
  }
  const [header, ...data] = records;
  const columns = header.map((column) => column.trim());
  const rows = data.map((record) => Object.fromEntries(
    columns.map((column, index) => [column, record[index] ?? '']),
  ));
  return { columns, rows };
};

const escapeValue = (value) => {
  const text = String(value ?? '');
  const needsQuotes = [',', '"', '\n', '\r'].some((symbol) => text.includes(symbol));
  return needsQuotes ? `"${text.replaceAll('"', '""')}"` : text;
};

export const toCsv = (columns, rows) => [
  columns,
  ...rows.map((row) => columns.map((column) => row[column])),
]
  .map((values) => values.map(escapeValue).join(','))
  .join('\n')
  .concat('\n');
