import analyzeFiles from '../analyzeFiles.js';
import buildRegistry from '../registry.js';
import writeOutput from '../output.js';
import { OUTPUT_FILES } from '../config.js';

const runFiles = (folder, outDir) => {
  const analysis = analyzeFiles(folder);
  const registryPath = writeOutput(folder, outDir, OUTPUT_FILES.registry, buildRegistry(analysis.files));
  return { ...analysis, outputs: { registry: registryPath } };
};

export default runFiles;
