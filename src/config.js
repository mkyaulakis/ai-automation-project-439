export const DEFAULT_OUT_DIR = './out';

export const FILE_TYPES = {
  table: 'табличный документ',
  text: 'текстовый документ',
  binary: 'непарсимый',
};

export const STATUSES = {
  document: 'документ',
  manual: 'требует ручного разбора',
  foreign: 'постороннее',
};

export const EXTENSION_TYPES = {
  '.csv': 'table',
  '.json': 'table',
  '.txt': 'text',
  '.md': 'text',
  '.pdf': 'binary',
  '.jpg': 'binary',
  '.jpeg': 'binary',
  '.xlsx': 'binary',
};

export const SIGNATURES = [
  { format: 'pdf', bytes: [0x25, 0x50, 0x44, 0x46] },
  { format: 'jpeg', bytes: [0xff, 0xd8, 0xff] },
  { format: 'png', bytes: [0x89, 0x50, 0x4e, 0x47] },
  { format: 'zip', bytes: [0x50, 0x4b] },
];

export const SYSTEM_FILES = ['.ds_store', 'thumbs.db', 'desktop.ini'];

export const TEXT_CONTROL_BYTES = [0x09, 0x0a, 0x0d];

export const SNIFF_LENGTH = 512;

export const HASH_ALGORITHM = 'sha256';

export const COPY_MARKERS = ['копия', 'copy', '-', '—'];

export const CSV_DELIMITERS = [',', ';'];

export const OUTPUT_FILES = {
  registry: 'registry.csv',
};

export const REGISTRY_COLUMNS = [
  'путь',
  'имя',
  'тип',
  'размер',
  'хеш',
  'статус',
  'основная копия',
  'строк',
  'колонки',
];

export const LIST_SEPARATOR = ', ';

export const CONTACT_COLUMN_MAP = {
  имя: ['имя', 'фио', 'name', 'full name', 'имя и фамилия'],
  телефон: ['телефон', 'моб. телефон', 'мобильный телефон', 'тел.', 'phone', 'mobile'],
  почта: ['почта', 'e-mail', 'email', 'mail', 'эл. почта', 'электронная почта'],
};

export const CONTACT_KEY_FIELDS = ['телефон', 'почта'];

export const EMPTY_PLACEHOLDERS = ['-', '—', '–', 'null', 'none', 'undefined'];

export const PHONE = {
  digits: '0123456789',
  length: 11,
  countryCode: '7',
  trunkPrefixes: ['7', '8'],
};
