import { execSync } from 'child_process';
import { GitClient } from './git.client';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

describe('GitClient', () => {
  let gitClient: GitClient;

  beforeEach(() => {
    jest.clearAllMocks();
    gitClient = new GitClient();
  });

  it('should handle stage diff options correctly', () => {
    const diffOptions = { type: 'stage' as 'stage' };
    (execSync as jest.Mock).mockReturnValue('Mocked stage diff');
    const diff = gitClient.getDiff(diffOptions);
    expect(execSync).toHaveBeenCalledWith(
      "git diff --staged ':(exclude)package-lock.json' ':(exclude)yarn.lock' ':(exclude)dist/*' ':(exclude)lib/*'",
    );
    expect(diff).toEqual('Mocked stage diff');
  });

  it('should handle branch diff options correctly', () => {
    const diffOptions = {
      type: 'branch' as 'branch',
      branch1: 'branch1',
      branch2: 'branch2',
    };
    (execSync as jest.Mock).mockReturnValue('Mocked branch diff');
    const diff = gitClient.getDiff(diffOptions);
    expect(execSync).toHaveBeenCalledWith(
      "git diff branch1..branch2 ':(exclude)package-lock.json' ':(exclude)yarn.lock' ':(exclude)dist/*' ':(exclude)lib/*'",
    );
    expect(diff).toEqual('Mocked branch diff');
  });

  it('should handle commit diff options correctly', () => {
    const diffOptions = {
      type: 'commit' as 'commit',
      commit1: 'commit1',
      commit2: 'commit2',
    };
    (execSync as jest.Mock).mockReturnValue('Mocked commit diff');
    const diff = gitClient.getDiff(diffOptions);
    expect(execSync).toHaveBeenCalledWith(
      "git diff commit1..commit2 ':(exclude)package-lock.json' ':(exclude)yarn.lock' ':(exclude)dist/*' ':(exclude)lib/*'",
    );
    expect(diff).toEqual('Mocked commit diff');
  });

  it('should handle file diff options correctly', () => {
    const diffOptions = {
      type: 'file' as 'file',
      files: ['file1.txt', 'file2.txt'],
    };
    (execSync as jest.Mock).mockReturnValue('Mocked file diff');
    const diff = gitClient.getDiff(diffOptions);
    expect(execSync).toHaveBeenCalledWith(
      "git diff -- file1.txt file2.txt ':(exclude)package-lock.json' ':(exclude)yarn.lock' ':(exclude)dist/*' ':(exclude)lib/*'",
    );
    expect(diff).toEqual('Mocked file diff');
  });
});
