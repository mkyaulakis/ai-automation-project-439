const pluralGroups = (count) => (
  count % 10 === 1 && count % 100 !== 11 ? 'группе' : 'группах'
);

const formatFilesOutput = ({ summary, outputs }) => {
  const { types, statuses } = summary;
  return [
    `Файлов найдено: ${summary.total}`,
    `Табличных документов: ${types.table}, текстовых: ${types.text}, непарсимых: ${types.binary}`,
    `Документов: ${statuses.document}, требуют ручного разбора: ${statuses.manual}, посторонних: ${statuses.foreign}`,
    `Копий найдено: ${summary.copies} в ${summary.groups} ${pluralGroups(summary.groups)}`,
    `Реестр: ${outputs.registry}`,
  ].join('\n');
};

export default formatFilesOutput;
