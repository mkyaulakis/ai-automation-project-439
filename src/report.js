import path from 'node:path';
import asTable from 'as-table';
import { JSON_INDENT } from './config.js';
import {
  contactsSummaryLines,
  copiesSummaryLine,
  documentsSummaryLines,
  pluralize,
  unmatchedColumnsLines,
} from './format.js';

const bytes = (count) => `${count} ${pluralize(count, ['байт', 'байта', 'байт'])}`;

const filesCount = (count) => `${count} ${pluralize(count, ['файл', 'файла', 'файлов'])}`;

const indent = (lines) => lines.map((line) => `  ${line}`);

const table = (rows) => asTable(rows)
  .split('\n')
  .map((line) => line.trimEnd());

const fileList = (title, note, paths) => {
  if (paths.length === 0) {
    return [`${title} (0)`, '', 'Таких файлов нет.'];
  }
  return [`${title} (${paths.length})`, '', note, '', ...indent(paths)];
};

const toReportData = (folder, { files, contacts }) => {
  const relative = (filePath) => path.relative(folder, filePath);
  const pathsWithStatus = (status) => files.files
    .filter((file) => file.status === status)
    .map((file) => relative(file.path));
  return {
    folder,
    files: {
      ...files.summary,
      manual: pathsWithStatus('manual'),
      foreign: pathsWithStatus('foreign'),
      extraSize: files.duplicates.reduce((sum, group) => sum + group.extraSize, 0),
      duplicateGroups: files.duplicates.map((group) => ({
        files: [group.primary, ...group.copies].map((file) => relative(file.path)),
        extraSize: group.extraSize,
      })),
    },
    contacts: {
      ...contacts.summary,
      sources: contacts.exports.map((item) => ({
        source: item.source,
        path: relative(item.path),
        records: item.records.length,
      })),
      rejected: contacts.rejectedValues,
      unmatchedColumns: contacts.exports.flatMap(({ source, unmatchedColumns }) => (
        unmatchedColumns.map((column) => ({ column, source }))
      )),
    },
  };
};

const documentsSection = (files, summary) => [
  'ДОКУМЕНТЫ',
  '',
  ...documentsSummaryLines(summary),
  '',
  ...fileList(
    'Требуют ручного разбора',
    'Программа эти файлы не прочитала, содержимое придётся посмотреть человеку.',
    files.manual,
  ),
  '',
  ...fileList(
    'Можно удалить',
    'Это не документы компании: системные, пустые или неподдерживаемые файлы.',
    files.foreign,
  ),
];

const copiesSection = (files, summary) => [
  'КОПИИ',
  '',
  copiesSummaryLine(summary),
  `Освободится при уборке: ${bytes(files.extraSize)}`,
  ...files.duplicateGroups.flatMap((group, index) => [
    '',
    `Группа ${index + 1}: ${filesCount(group.files.length)}, лишний размер ${bytes(group.extraSize)}`,
    ...indent(group.files),
  ]),
];

const rejectedLines = (rejected) => (rejected.length === 0 ? [] : [
  '',
  `Отбракованные значения (${rejected.length})`,
  '',
  ...indent(rejected.map(({ source, field, value }) => `${source}, ${field}: ${value}`)),
]);

const contactsSection = (contacts, summary, exports) => [
  'КОНТАКТЫ',
  '',
  ...contactsSummaryLines(summary),
  ...unmatchedColumnsLines(exports),
  '',
  ...table(contacts.sources.map(({ source, records }) => ({ Источник: source, Записей: records }))),
  ...rejectedLines(contacts.rejected),
];

export const buildTextReport = (folder, analysis) => {
  const data = toReportData(folder, analysis);
  return [
    `Отчёт по папке ${folder}`,
    '',
    ...documentsSection(data.files, analysis.files.summary),
    '',
    ...copiesSection(data.files, analysis.files.summary),
    '',
    ...contactsSection(data.contacts, analysis.contacts.summary, analysis.contacts.exports),
    '',
  ].join('\n');
};

export const buildJsonReport = (folder, analysis) => JSON.stringify(
  toReportData(folder, analysis),
  null,
  JSON_INDENT,
);
