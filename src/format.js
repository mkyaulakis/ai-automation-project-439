const formatFilesOutput = ({ summary }) => {
  const { types, statuses } = summary;
  return [
    `Файлов найдено: ${summary.total}`,
    `Табличных документов: ${types.table}, текстовых: ${types.text}, непарсимых: ${types.binary}`,
    `Документов: ${statuses.document}, требуют ручного разбора: ${statuses.manual}, посторонних: ${statuses.foreign}`,
  ].join('\n');
};

export default formatFilesOutput;
