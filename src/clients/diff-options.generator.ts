import { CWCommandOptions } from '@/command-runner';

type Stage = { type: 'stage' };
type Branch = { type: 'branch'; branch1: string; branch2: string };
type Commit = { type: 'commit'; commit1: string; commit2: string };
type File = { type: 'file'; files: string[] };

export type DiffOptions = Stage | Branch | Commit | File;

export class DiffOptionsGenerator {
  static generate(options: CWCommandOptions, inputs: string[]): DiffOptions {
    const handlers = {
      branch: () => {
        if (inputs.length !== 2)
          throw new Error(
            'Branch comparison requires exactly two branch names.',
          );
        return this.handleBranchComparison(inputs[0], inputs[1]);
      },
      commit: () => {
        if (inputs.length !== 2)
          throw new Error(
            'Commit comparison requires exactly two commit identifiers.',
          );
        return this.handleCommitComparison(inputs[0], inputs[1]);
      },
      file: () => {
        if (inputs.length === 0)
          throw new Error('File comparison requires at least one file path.');
        return this.handleFileComparison(inputs);
      },
      generate: () => {
        return this.handleStageComparison();
      },
    };

    for (const option in options) {
      if (options[option] && handlers[option]) {
        return handlers[option]();
      }
    }

    throw new Error(
      'Invalid command options. Please specify a valid comparison type.',
    );
  }

  static handleBranchComparison(branch1: string, branch2: string): DiffOptions {
    return { type: 'branch', branch1, branch2 };
  }

  static handleCommitComparison(commit1: string, commit2: string): DiffOptions {
    return { type: 'commit', commit1, commit2 };
  }

  static handleFileComparison(files: string[]): DiffOptions {
    return { type: 'file', files };
  }

  static handleStageComparison(): DiffOptions {
    return { type: 'stage' };
  }
}
