import analyzeFiles from '../analyzeFiles.js';
import collectContacts from '../contacts.js';

const runContacts = (folder) => {
  const contacts = collectContacts(analyzeFiles(folder).files);
  return {
    ...contacts,
    summary: {
      exports: contacts.exports.length,
      records: contacts.records.length,
      rejectedValues: contacts.rejectedValues.length,
      withoutKey: contacts.withoutKey.length,
    },
  };
};

export default runContacts;
