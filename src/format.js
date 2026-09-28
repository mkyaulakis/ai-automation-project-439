const formatFilesOutput = ({ summary }) => [
  `Файлов найдено: ${summary.total}`,
].join('\n');

export default formatFilesOutput;
