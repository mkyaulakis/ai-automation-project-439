import buildRegistry from '../registry.js';
import writeOutput from '../output.js';
import { analyzeFolder, writeReports } from '../analyzeFolder.js';
import { OUTPUT_FILES } from '../config.js';

const runFiles = (folder, outDir) => {
  const analysis = analyzeFolder(folder);
  const registry = writeOutput(folder, outDir, OUTPUT_FILES.registry, buildRegistry(analysis.files.files));
  return {
    ...analysis,
    outputs: { registry, ...writeReports(folder, outDir, analysis) },
  };
};

export default runFiles;
