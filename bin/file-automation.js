#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'node:module';
import runFiles from '../src/commands/files.js';
import runContacts from '../src/commands/contacts.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

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
  .option('--out <папка>', 'папка для отчётов', './out')
  .action((folder, options) => {
    runFiles(folder, options);
  });

program
  .command('contacts')
  .description('собрать чистую таблицу контактов')
  .argument('<папка>', 'папка с выгрузками контактов')
  .option('--out <папка>', 'папка для отчётов', './out')
  .action((folder, options) => {
    runContacts(folder, options);
  });

if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse();
