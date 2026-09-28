export const pluralize = (count, [one, few, many]) => {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return many;
  }
  if (last === 1) {
    return one;
  }
  return last >= 2 && last <= 4 ? few : many;
};

const inGroups = (count) => pluralize(count, ['группе', 'группах', 'группах']);

export const documentsSummaryLines = (summary) => {
  const { types, statuses } = summary;
  return [
    `Файлов найдено: ${summary.total}`,
    `Табличных документов: ${types.table}, текстовых: ${types.text}, непарсимых: ${types.binary}`,
    `Документов: ${statuses.document}, требуют ручного разбора: ${statuses.manual}, посторонних: ${statuses.foreign}`,
  ];
};

export const copiesSummaryLine = (summary) => (
  `Копий найдено: ${summary.copies} в ${summary.groups} ${inGroups(summary.groups)}`
);

export const contactsSummaryLines = (summary) => [
  `Выгрузок прочитано: ${summary.exports}, записей: ${summary.records}`,
  `Уникальных контактов: ${summary.unique}`,
  `Отбраковано значений: ${summary.rejectedValues}, записей без телефона и почты: ${summary.withoutKey}`,
];

export const unmatchedColumnsLines = (exports) => {
  const unmatched = exports.flatMap(({ source, unmatchedColumns }) => (
    unmatchedColumns.map((column) => `${column} (${source})`)
  ));
  return unmatched.length === 0 ? [] : [`Колонки без соответствия: ${unmatched.join(', ')}`];
};

const reportPathLines = (outputs) => [
  `Отчёт: ${outputs.report}`,
  `Отчёт для программ: ${outputs.reportJson}`,
];

export const formatFilesOutput = ({ files, outputs }) => [
  ...documentsSummaryLines(files.summary),
  copiesSummaryLine(files.summary),
  `Реестр: ${outputs.registry}`,
  ...reportPathLines(outputs),
].join('\n');

export const formatContactsOutput = ({ contacts, outputs }) => [
  ...contacts.exports.map(({ source, records }) => `${source}: записей ${records.length}`),
  ...contactsSummaryLines(contacts.summary),
  ...unmatchedColumnsLines(contacts.exports),
  `Таблица: ${outputs.contacts}`,
  ...reportPathLines(outputs),
].join('\n');
