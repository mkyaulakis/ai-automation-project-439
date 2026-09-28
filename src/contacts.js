import { CONTACT_COLUMN_MAP, CONTACT_KEY_FIELDS } from './config.js';
import { normalizeEmail, normalizeName, normalizePhone } from './normalize.js';

const normalizeColumn = (column) => column.trim().toLowerCase();

const fieldForColumn = (column) => Object.keys(CONTACT_COLUMN_MAP)
  .find((field) => CONTACT_COLUMN_MAP[field].includes(normalizeColumn(column)));

const isContactExport = (file) => file.type === 'table'
  && file.status === 'document'
  && file.columns.some((column) => CONTACT_KEY_FIELDS.includes(fieldForColumn(column)));

const toRawRecord = (row, columns, source) => {
  const empty = Object.fromEntries(Object.keys(CONTACT_COLUMN_MAP).map((field) => [field, '']));
  return columns.reduce((record, column) => {
    const field = fieldForColumn(column);
    if (field === undefined || record[field] !== '') {
      return record;
    }
    return { ...record, [field]: row[column] ?? '' };
  }, { ...empty, источник: source });
};

const normalizeRecord = (raw) => {
  const phone = normalizePhone(raw.телефон);
  const email = normalizeEmail(raw.почта);
  const rejectedValues = [
    phone.rejected ? { field: 'телефон', value: raw.телефон, source: raw.источник } : null,
    email.rejected ? { field: 'почта', value: raw.почта, source: raw.источник } : null,
  ].filter((item) => item !== null);
  return {
    имя: normalizeName(raw.имя),
    телефон: phone.value,
    почта: email.value,
    источник: raw.источник,
    rejectedValues,
  };
};

const readExport = (file) => ({
  source: file.name,
  path: file.path,
  records: file.rows.map((row) => normalizeRecord(toRawRecord(row, file.columns, file.name))),
  unmatchedColumns: file.columns.filter((column) => fieldForColumn(column) === undefined),
});

const hasKey = (record) => CONTACT_KEY_FIELDS.some((field) => record[field] !== '');

const collectContacts = (files) => {
  const exports = files.filter(isContactExport).map(readExport);
  const records = exports.flatMap((item) => item.records);
  return {
    exports,
    records,
    rejectedValues: records.flatMap((record) => record.rejectedValues),
    withoutKey: records.filter((record) => !hasKey(record)),
  };
};

export default collectContacts;
