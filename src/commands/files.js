import listFiles from '../walk.js';

const runFiles = (folder) => {
  const files = listFiles(folder);
  return {
    files,
    summary: {
      total: files.length,
    },
  };
};

export default runFiles;
