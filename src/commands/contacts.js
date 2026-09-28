import analyzeFiles from '../analyzeFiles.js';
import collectContacts from '../contacts.js';

const runContacts = (folder) => {
  const { exports, records } = collectContacts(analyzeFiles(folder).files);
  return {
    exports,
    records,
    summary: {
      exports: exports.length,
      records: records.length,
    },
  };
};

export default runContacts;
