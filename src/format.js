const pluralGroups = (count) => (
  count % 10 === 1 && count % 100 !== 11 ? 'группе' : 'группах'
);

export const formatFilesOutput = ({ summary, outputs }) => {
  const { types, statuses } = summary;
  return [
    `Файлов найдено: ${summary.total}`,
    `Табличных документов: ${types.table}, текстовых: ${types.text}, непарсимых: ${types.binary}`,
    `Документов: ${statuses.document}, требуют ручного разбора: ${statuses.manual}, посторонних: ${statuses.foreign}`,
    `Копий найдено: ${summary.copies} в ${summary.groups} ${pluralGroups(summary.groups)}`,
    `Реестр: ${outputs.registry}`,
  ].join('\n');
};

const formatUnmatchedColumns = (exports) => {
  const unmatched = exports.flatMap(({ source, unmatchedColumns }) => (
    unmatchedColumns.map((column) => `${column} (${source})`)
  ));
  return unmatched.length === 0 ? [] : [`Колонки без соответствия: ${unmatched.join(', ')}`];
};

export const formatContactsOutput = ({ exports, summary, outputs }) => [
  ...exports.map(({ source, records }) => `${source}: записей ${records.length}`),
  `Выгрузок прочитано: ${summary.exports}, записей: ${summary.records}`,
  `Уникальных контактов: ${summary.unique}`,
  `Отбраковано значений: ${summary.rejectedValues}, записей без телефона и почты: ${summary.withoutKey}`,
  ...formatUnmatchedColumns(exports),
  `Таблица: ${outputs.contacts}`,
].join('\n');
