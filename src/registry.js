import { toCsv } from './csv.js';
import {
  FILE_TYPES,
  LIST_SEPARATOR,
  REGISTRY_COLUMNS,
  STATUSES,
} from './config.js';

const toRegistryRow = (file) => {
  const isTable = file.type === 'table';
  const values = [
    file.path,
    file.name,
    FILE_TYPES[file.type],
    file.size,
    file.hash,
    STATUSES[file.status],
    file.primary,
    isTable ? file.rowCount : '',
    isTable ? file.columns.join(LIST_SEPARATOR) : '',
  ];
  return Object.fromEntries(REGISTRY_COLUMNS.map((column, index) => [column, values[index]]));
};

const buildRegistry = (files) => toCsv(REGISTRY_COLUMNS, files.map(toRegistryRow));

export default buildRegistry;
