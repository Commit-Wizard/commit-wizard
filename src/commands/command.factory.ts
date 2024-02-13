import { GPTClient } from '../clients/gpt.client';
import { CommandName } from '../commit-wizard.command-runner';
import { GenerateCommitMsgCommand } from './generate-commit-msg.command';
import { SetApiKeyCommand } from './set-api-key.command';
import { ShowApiKeyCommand } from './show-api-key.command';

export interface ICommand {
  execute(options?: { apiKey?: string; diffOptions?: string[] }): void;
}

export class CommandFactory {
  static createCommand(commandName: CommandName, apiKey: string): ICommand {
    switch (commandName) {
      case CommandName.SetKey:
        return new SetApiKeyCommand(apiKey);
      case CommandName.ShowKey:
        return new ShowApiKeyCommand();
      case CommandName.GenerateCommitMsg:
        if (!apiKey) {
          throw new Error('Api key required');
        }
        return new GenerateCommitMsgCommand(new GPTClient(apiKey));
      default:
        throw new Error('Invalid command provided.');
    }
  }
}
