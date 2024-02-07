import { Command, CommandRunner, Option } from 'nest-commander';
import * as dotenv from 'dotenv';
import { CommandFactory } from './commands/command.factory';

dotenv.config();

type CWCommandOptions = {
  key?: string;
  showKey?: boolean;
  generateCommitMsg?: boolean;
};

export enum CommandName {
  SetKey = 'setKey',
  ShowKey = 'showKey',
  GenerateCommitMsg = 'generateCommitMsg',
}

@Command({
  name: 'cw',
  description: 'Set the API key for external service',
})
export class CWCommandRunner extends CommandRunner {
  private apiKey: string = process.env.EXTERNAL_SERVICE_API_KEY || '';

  async run(inputs: string[], options: CWCommandOptions): Promise<void> {
    const commandName = this.determineCommand(options);

    if (!commandName) {
      console.error('No valid command provided.');
      return;
    }

    try {
      const command = CommandFactory.createCommand(commandName, this.apiKey);
      command.execute();
    } catch (error) {
      console.error(error.message);
    }
  }

  private determineCommand(options: CWCommandOptions): CommandName | null {
    if (options.key) return CommandName.SetKey;
    if (options.showKey) return CommandName.ShowKey;
    if (options.generateCommitMsg) return CommandName.GenerateCommitMsg;
    return null;
  }

  @Option({
    flags: '-k, --key [key]',
    description: 'Set the API key for the external service',
  })
  parseKey(key: string): any {
    return key;
  }

  @Option({
    flags: '-s, --show-key',
    description: 'Show the current API key',
  })
  parseShowKey(): any {
    return true;
  }

  @Option({
    flags: '-g, --generate-commit-msg',
    description: 'Generate a commit message',
  })
  parseGenerateCommitMsg(): any {
    return true;
  }
}
