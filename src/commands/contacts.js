import analyzeFiles from '../analyzeFiles.js';
import collectContacts from '../contacts.js';
import writeOutput from '../output.js';
import { toCsv } from '../csv.js';
import { CONTACTS_COLUMNS, OUTPUT_FILES, SOURCES_SEPARATOR } from '../config.js';

const buildContactsTable = (contacts) => toCsv(
  CONTACTS_COLUMNS,
  contacts.map((contact) => ({ ...contact, источники: contact.источники.join(SOURCES_SEPARATOR) })),
);

const runContacts = (folder, outDir) => {
  const result = collectContacts(analyzeFiles(folder).files);
  const tablePath = writeOutput(folder, outDir, OUTPUT_FILES.contacts, buildContactsTable(result.contacts));
  return {
    ...result,
    summary: {
      exports: result.exports.length,
      records: result.records.length,
      unique: result.contacts.length,
      rejectedValues: result.rejectedValues.length,
      withoutKey: result.withoutKey.length,
    },
    outputs: { contacts: tablePath },
  };
};

export default runContacts;
