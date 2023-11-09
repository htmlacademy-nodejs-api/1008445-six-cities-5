import chalk from 'chalk';
import { ICommand } from './command.interface.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.blue(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # Выводит информацию о версии приложения из файла package.json
            --help:                      # Выводит информацию о списке поддерживаемых приложением команд
            --import <path>:             # Импортирует данные о предложениях об аренде из tsv-файла в базу данных
            --generate <n> <path> <url>  # Генерирует n предложений об аренде в файл формата tsv
    `));
  }
}
