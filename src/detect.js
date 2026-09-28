import {
  EXTENSION_TYPES,
  SIGNATURES,
  SNIFF_LENGTH,
  SYSTEM_FILES,
  TEXT_CONTROL_BYTES,
} from './config.js';

const hasSignature = (content) => SIGNATURES.some(({ bytes }) => (
  content.length >= bytes.length
  && bytes.every((byte, index) => content[index] === byte)
));

const looksBinary = (content) => [...content.subarray(0, SNIFF_LENGTH)]
  .some((byte) => byte < 0x20 && !TEXT_CONTROL_BYTES.includes(byte));

export const detectType = (ext, content) => {
  if (hasSignature(content) || looksBinary(content)) {
    return 'binary';
  }
  if (Object.hasOwn(EXTENSION_TYPES, ext)) {
    return EXTENSION_TYPES[ext];
  }
  return 'text';
};

export const detectStatus = ({ name, ext, size }, type) => {
  const isSystemFile = SYSTEM_FILES.includes(name.toLowerCase());
  const isUnsupported = ext !== '' && !Object.hasOwn(EXTENSION_TYPES, ext);
  if (size === 0 || isSystemFile || isUnsupported) {
    return 'foreign';
  }
  return type === 'binary' ? 'manual' : 'document';
};
