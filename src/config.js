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
