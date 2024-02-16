import { CWCommandOptions } from "@/command-runner";
import { DiffOptions } from "./git.client";

export class DiffOptionsGenerator {
  static generate(options: CWCommandOptions, inputs: string[]): DiffOptions {
    switch (true) {
      case options.branch:
        return this.handleBranchComparison(inputs);

      case options.commit:
        return this.handleCommitComparison(inputs);

      case options.file:
        return this.handleFileComparison(inputs);

      case options.generate:
        return this.handleStageComparison();

      default:
        throw new Error('Invalid command options. Please specify a valid comparison type.');
    }
  }

  static handleBranchComparison(inputs: string[]): DiffOptions {
    if (inputs.length !== 2) {
      throw new Error('Branch comparison requires exactly two branch names.');
    }
    return { type: 'branch', branch1: inputs[0], branch2: inputs[1] };
  }

  static handleCommitComparison(inputs: string[]): DiffOptions {
    if (inputs.length !== 2) {
      throw new Error('Commit comparison requires exactly two commit identifiers.');
    }
    return { type: 'commit', commit1: inputs[0], commit2: inputs[1] };
  }

  static handleFileComparison(inputs: string[]): DiffOptions {
    if (inputs.length === 0) {
      throw new Error('File comparison requires at least one file path.');
    }
    return { type: 'file', files: inputs };
  }

  static handleStageComparison(): DiffOptions {
    return { type: 'stage' };
  }
}
