import writeOutput from '../output.js';
import { toCsv } from '../csv.js';
import { analyzeFolder, writeReports } from '../analyzeFolder.js';
import { CONTACTS_COLUMNS, OUTPUT_FILES, SOURCES_SEPARATOR } from '../config.js';

const buildContactsTable = (contacts) => toCsv(
  CONTACTS_COLUMNS,
  contacts.map((contact) => ({ ...contact, источники: contact.источники.join(SOURCES_SEPARATOR) })),
);

const runContacts = (folder, outDir) => {
  const analysis = analyzeFolder(folder);
  const table = buildContactsTable(analysis.contacts.contacts);
  return {
    ...analysis,
    outputs: {
      contacts: writeOutput(folder, outDir, OUTPUT_FILES.contacts, table),
      ...writeReports(folder, outDir, analysis),
    },
  };
};

export default runContacts;
