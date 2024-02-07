import { CommandFactory } from './commands/command.factory';
import { CWCommandRunner, CommandName } from './commit-wizard.command-runner';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('./commands/command.factory', () => ({
  CommandFactory: {
    createCommand: jest.fn(),
  },
}));

describe('CWCommandRunner', () => {
  let cwCommandRunner: CWCommandRunner;

  beforeEach(() => {
    cwCommandRunner = new CWCommandRunner();
    (CommandFactory.createCommand as jest.Mock).mockImplementation((commandName, apiKey) => ({
      execute: jest.fn().mockImplementation(() => {
        console.log(`Executing ${commandName} with API key: ${apiKey}`);
      }),
    }));
  });

  it('should set the API key when -k option is provided', async () => {
    const options = { key: 'test-api-key' };
    await cwCommandRunner.run([], options);
    expect(CommandFactory.createCommand).toHaveBeenCalledWith(CommandName.SetKey, 'test-api-key');
  });

  it('should show the API key when -s option is provided', async () => {
    const options = { showKey: true };
    await cwCommandRunner.run([], options);
    expect(CommandFactory.createCommand).toHaveBeenCalledWith(CommandName.ShowKey, expect.any(String));
  });

  it('should generate a commit message when -g option is provided', async () => {
    const options = { generateCommitMsg: true };
    await cwCommandRunner.run([], options);
    expect(CommandFactory.createCommand).toHaveBeenCalledWith(CommandName.GenerateCommitMsg, expect.any(String));
  });

  it('should throw an error for invalid command', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await cwCommandRunner.run([], {});
    expect(consoleSpy).toHaveBeenCalledWith('No valid command provided.');
    consoleSpy.mockRestore();
  });
});
