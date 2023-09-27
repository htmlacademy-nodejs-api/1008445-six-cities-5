#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApplication();
  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
