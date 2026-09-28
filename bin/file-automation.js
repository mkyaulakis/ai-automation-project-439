#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'node:module';
import runFiles from '../src/commands/files.js';
import runContacts from '../src/commands/contacts.js';
import formatFilesOutput from '../src/format.js';
import { DEFAULT_OUT_DIR } from '../src/config.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const handle = (action) => (...args) => {
  try {
    action(...args);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  }
};

const program = new Command();

program
  .name('file-automation')
  .description('Автоматизация разбора файлов компании')
  .version(version)
  .showHelpAfterError();

program
  .command('files')
  .description('собрать реестр документов папки')
  .argument('<папка>', 'папка с файлами компании')
  .option('--out <папка>', 'папка для отчётов', DEFAULT_OUT_DIR)
  .action(handle((folder, options) => {
    console.log(formatFilesOutput(runFiles(folder, options.out)));
  }));

program
  .command('contacts')
  .description('собрать чистую таблицу контактов')
  .argument('<папка>', 'папка с выгрузками контактов')
  .option('--out <папка>', 'папка для отчётов', DEFAULT_OUT_DIR)
  .action(handle((folder, options) => {
    runContacts(folder, options);
  }));

if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse();
