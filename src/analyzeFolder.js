import analyzeFiles from './analyzeFiles.js';
import collectContacts from './contacts.js';
import writeOutput from './output.js';
import { buildJsonReport, buildTextReport } from './report.js';
import { OUTPUT_FILES } from './config.js';

export const analyzeFolder = (folder) => {
  const files = analyzeFiles(folder);
  return { files, contacts: collectContacts(files.files) };
};

export const writeReports = (folder, outDir, analysis) => ({
  report: writeOutput(folder, outDir, OUTPUT_FILES.report, buildTextReport(folder, analysis)),
  reportJson: writeOutput(folder, outDir, OUTPUT_FILES.reportJson, buildJsonReport(folder, analysis)),
});
