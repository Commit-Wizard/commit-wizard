import { CommandName } from '../commit-wizard.command-runner';
import { SetApiKeyCommand } from './set-api-key.command';
import { ShowApiKeyCommand } from './show-api-key.command';
import { GenerateCommitMsgCommand } from './generate-commit-msg.command';
import { CommandFactory } from './command.factory';

describe('CommandFactory', () => {
  const apiKey = 'test-api-key';

  it('should create a SetApiKeyCommand', () => {
    const command = CommandFactory.createCommand(CommandName.SetKey, apiKey);
    expect(command).toBeInstanceOf(SetApiKeyCommand);
  });

  it('should create a ShowApiKeyCommand', () => {
    const command = CommandFactory.createCommand(CommandName.ShowKey, '');
    expect(command).toBeInstanceOf(ShowApiKeyCommand);
  });

  it('should create a GenerateCommitMsgCommand', () => {
    const command = CommandFactory.createCommand(CommandName.GenerateCommitMsg, apiKey);
    expect(command).toBeInstanceOf(GenerateCommitMsgCommand);
  });

  it('should throw an error if API key is missing for GenerateCommitMsgCommand', () => {
    expect(() => {
      CommandFactory.createCommand(CommandName.GenerateCommitMsg, '');
    }).toThrow('Api key required');
  });

  it('should throw an error for an invalid command', () => {
    expect(() => {
      CommandFactory.createCommand('InvalidCommand' as CommandName, apiKey);
    }).toThrow('Invalid command provided.');
  });
});
