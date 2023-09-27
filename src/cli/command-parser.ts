type TParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): TParsedCommand {
    const parsedCommand: TParsedCommand = {};
    let currentCommand = '';

    for (const arg of cliArguments) {
      if (arg.startsWith('--')) {
        parsedCommand[ arg ] = [];
        currentCommand = arg;
      } else if (currentCommand && arg) {
        parsedCommand[ currentCommand ].push(arg);
      }
    }

    return parsedCommand;
  }
}
