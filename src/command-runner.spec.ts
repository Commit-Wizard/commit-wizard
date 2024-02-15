import { prompt } from 'enquirer';
import { GPTClient } from '@/clients/gpt.client';
import { CWCommandRunner } from './command-runner';
import { GitClient } from './clients/git.client';
import { TestBed } from '@automock/jest';

jest.mock('enquirer', () => ({
  prompt: jest.fn(),
}));

describe('CWCommandRunner', () => {
  let commandRunner: CWCommandRunner;
  let gptClient: jest.Mocked<GPTClient>;
  let gitClient: jest.Mocked<GitClient>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(CWCommandRunner).compile();

    commandRunner = unit;
    gptClient = unitRef.get(GPTClient);
    gitClient = unitRef.get(GitClient);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call OpenAI and print the completion message for staged changes', async () => {
    gitClient.getDiff.mockReturnValue('Mocked diff');
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'feat: Add a new feature.',
    });
    gptClient.generateCommitMessage.mockResolvedValue('Mocked commit message');
    const consoleSpy = jest.spyOn(console, 'log');

    await commandRunner.run([], { generate: true }),
      expect(consoleSpy).toHaveBeenCalledWith('Mocked commit message');
  });

  it('should throw an error if there are no staged changes', async () => {
    gitClient.getDiff.mockReturnValue('');
    (prompt as jest.Mock).mockResolvedValue({
      commitType: 'feat: Add a new feature.',
    });
    const consoleSpy = jest.spyOn(console, 'error');

    await commandRunner.run([], { generate: true });

    expect(consoleSpy).toHaveBeenCalledWith(
      '❌ No diff found! Make sure to specify valid options and staged changes.',
    );
  });
});
