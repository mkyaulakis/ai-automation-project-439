import { CONTACT_COLUMN_MAP, CONTACT_KEY_FIELDS } from './config.js';

const normalizeColumn = (column) => column.trim().toLowerCase();

const fieldForColumn = (column) => Object.keys(CONTACT_COLUMN_MAP)
  .find((field) => CONTACT_COLUMN_MAP[field].includes(normalizeColumn(column)));

const isContactExport = (file) => file.type === 'table'
  && file.status === 'document'
  && file.columns.some((column) => CONTACT_KEY_FIELDS.includes(fieldForColumn(column)));

const toRecord = (row, columns, source) => {
  const empty = Object.fromEntries(Object.keys(CONTACT_COLUMN_MAP).map((field) => [field, '']));
  return columns.reduce((record, column) => {
    const field = fieldForColumn(column);
    if (field === undefined || record[field] !== '') {
      return record;
    }
    return { ...record, [field]: row[column] ?? '' };
  }, { ...empty, источник: source });
};

const readExport = (file) => ({
  source: file.name,
  path: file.path,
  records: file.rows.map((row) => toRecord(row, file.columns, file.name)),
  unmatchedColumns: file.columns.filter((column) => fieldForColumn(column) === undefined),
});

const collectContacts = (files) => {
  const exports = files.filter(isContactExport).map(readExport);
  return {
    exports,
    records: exports.flatMap((item) => item.records),
  };
};

export default collectContacts;
