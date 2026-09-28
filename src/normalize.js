import { EMPTY_PLACEHOLDERS, PHONE } from './config.js';

const accepted = (value) => ({ value, rejected: false });
const rejected = () => ({ value: '', rejected: true });

const clean = (value) => {
  const trimmed = String(value ?? '').trim();
  return EMPTY_PLACEHOLDERS.includes(trimmed.toLowerCase()) ? '' : trimmed;
};

export const normalizePhone = (raw) => {
  const value = clean(raw);
  if (value === '') {
    return accepted('');
  }
  const digits = [...value].filter((symbol) => PHONE.digits.includes(symbol)).join('');
  if (digits.length === PHONE.length - 1) {
    return accepted(`${PHONE.countryCode}${digits}`);
  }
  if (digits.length === PHONE.length && PHONE.trunkPrefixes.includes(digits[0])) {
    return accepted(`${PHONE.countryCode}${digits.slice(1)}`);
  }
  return rejected();
};

export const normalizeEmail = (raw) => {
  const value = clean(raw).toLowerCase();
  if (value === '') {
    return accepted('');
  }
  const parts = value.split('@');
  const isValid = parts.length === 2 && parts.every((part) => part !== '');
  return isValid ? accepted(value) : rejected();
};

const capitalize = (word) => word
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
  .join('-');

export const normalizeName = (raw) => clean(raw)
  .split(/\s+/)
  .filter((word) => word !== '')
  .map(capitalize)
  .join(' ');
