import path from 'node:path';
import { COPY_MARKERS } from './config.js';
import { comparePaths, pathDepth } from './paths.js';

export const normalizeName = (name) => {
  const lowered = name.toLowerCase();
  const ext = path.extname(lowered);
  const base = lowered.slice(0, lowered.length - ext.length)
    .replace(/\s*\(\d+\)$/, '')
    .split(' ')
    .filter((word) => word !== '' && !COPY_MARKERS.includes(word))
    .join(' ');
  return `${base}${ext}`;
};

const isCleanName = (name) => name === normalizeName(name);

const comparePrimary = (a, b) => {
  if (isCleanName(a.name) !== isCleanName(b.name)) {
    return isCleanName(a.name) ? -1 : 1;
  }
  if (pathDepth(a.path) !== pathDepth(b.path)) {
    return pathDepth(a.path) - pathDepth(b.path);
  }
  return comparePaths(a.path, b.path);
};

const linkFiles = (files) => {
  const parents = files.map((_file, index) => index);
  const findRoot = (index) => {
    if (parents[index] !== index) {
      parents[index] = findRoot(parents[index]);
    }
    return parents[index];
  };
  const firstByKey = new Map();
  files.forEach((file, index) => {
    [`hash:${file.hash}`, `name:${normalizeName(file.name)}`].forEach((key) => {
      if (firstByKey.has(key)) {
        parents[findRoot(index)] = findRoot(firstByKey.get(key));
      } else {
        firstByKey.set(key, index);
      }
    });
  });
  return findRoot;
};

const findDuplicateGroups = (files) => {
  const findRoot = linkFiles(files);
  const members = new Map();
  files.forEach((file, index) => {
    const root = findRoot(index);
    members.set(root, [...(members.get(root) ?? []), file]);
  });
  return [...members.values()]
    .filter((group) => group.length > 1)
    .map((group) => {
      const [primary, ...copies] = [...group].sort(comparePrimary);
      return {
        primary,
        copies,
        extraSize: copies.reduce((sum, copy) => sum + copy.size, 0),
      };
    })
    .sort((a, b) => comparePaths(a.primary.path, b.primary.path));
};

export default findDuplicateGroups;
