import { prompt } from 'enquirer';
import { execSync } from 'child_process';
import { GenerateCommitMsgCommand } from './generate-commit-msg.command';
import { GPTClient } from '@/clients/gpt.client';

jest.mock('enquirer', () => ({
  prompt: jest.fn(),
}));
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

describe('GenerateCommitMsgCommand', () => {
  let generateCommitMsgCommand: GenerateCommitMsgCommand;

  beforeEach(() => {
    jest.clearAllMocks();
    generateCommitMsgCommand = new GenerateCommitMsgCommand({
      generateCommitMessage: async () => {
        return 'Mocked commit message';
      },
    } as unknown as GPTClient);
  });

  it('should call OpenAI and print the completion message for staged changes', async () => {
    (execSync as jest.Mock).mockReturnValue('Mocked diff');
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'feat: Add a new feature.',
    });
    const command = new GenerateCommitMsgCommand({
      generateCommitMessage: async () => {
        return 'Mocked commit message';
      },
    } as unknown as GPTClient);
    const consoleSpy = jest.spyOn(console, 'log');

    await command.execute();

    expect(consoleSpy).toHaveBeenCalledWith('Mocked commit message');
  });

  it('should throw an error if there are no staged changes', async () => {
    (execSync as jest.Mock).mockReturnValue('');
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'feat: Add a new feature.',
    });

    await expect(
      new GenerateCommitMsgCommand({} as unknown as GPTClient).execute(),
    ).rejects.toThrow(
      '❌ No diff found! Make sure to specify valid options and staged changes.',
    );
  });

  it('should generate commit message for branch comparison', async () => {
    // Mocking user input for commit type selection
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'feat: Add a new feature.',
    });

    // Mocking git diff command for branch comparison
    (execSync as jest.Mock).mockReturnValue('Mocked branch diff');

    // Executing the command with branch comparison options
    await generateCommitMsgCommand.execute({
      diffOptions: ['-b', 'branch1', 'branch2'],
    });

    // Assertion: Verify that the commit message is generated correctly
    expect(console.log).toHaveBeenCalledWith('Mocked commit message');
  });

  it('should generate commit message for commit comparison', async () => {
    // Mocking user input for commit type selection
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'fix: Correct a bug.',
    });

    // Mocking git diff command for commit comparison
    (execSync as jest.Mock).mockReturnValue('Mocked commit diff');

    // Executing the command with commit comparison options
    await generateCommitMsgCommand.execute({
      diffOptions: ['-c', 'commit1', 'commit2'],
    });

    // Assertion: Verify that the commit message is generated correctly
    expect(console.log).toHaveBeenCalledWith('Mocked commit message');
  });

  it('should generate commit message for file comparison', async () => {
    // Mocking user input for commit type selection
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'docs: Update documentation.',
    });

    // Mocking git diff command for file comparison
    (execSync as jest.Mock).mockReturnValue('Mocked file diff');

    // Executing the command with file comparison options
    await generateCommitMsgCommand.execute({
      diffOptions: ['-f', 'file1.txt', 'file2.txt'],
    });

    // Assertion: Verify that the commit message is generated correctly
    expect(console.log).toHaveBeenCalledWith('Mocked commit message');
  });

  it('should throw an error if no diff is found', async () => {
    // Mocking user input for commit type selection
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'chore: Miscellaneous tasks.',
    });

    // Mocking git diff command to return an empty string (no diff found)
    (execSync as jest.Mock).mockReturnValue('');

    // Executing the command without specifying diff options
    await expect(
      new GenerateCommitMsgCommand({} as unknown as GPTClient).execute(),
    ).rejects.toThrow(
      '❌ No diff found! Make sure to specify valid options and staged changes.',
    );
  });
});
