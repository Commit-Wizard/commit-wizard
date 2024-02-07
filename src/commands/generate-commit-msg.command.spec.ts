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
  const apiKey = 'test-api-key';

  beforeEach(() => {
    jest.clearAllMocks();
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
      '❌ No staged diff! Stage the changes you want to commit first.',
    );
  });
});
