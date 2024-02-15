import { CWCommandOptions } from "@/command-runner";
import { DiffOptions } from "./git.client";

export class DiffOptionsGenerator {
  static generate(options: CWCommandOptions, inputs: string[]): DiffOptions {
    if (options.branch) {
      if (inputs.length !== 2) {
        throw new Error('Branch comparison requires exactly two branch names.');
      }
      return { type: 'branch', branch1: inputs[0], branch2: inputs[1] };
    } else if (options.commit) {
      if (inputs.length !== 2) {
        throw new Error(
          'Commit comparison requires exactly two commit identifiers.',
        );
      }
      return { type: 'commit', commit1: inputs[0], commit2: inputs[1] };
    } else if (options.file) {
      if (inputs.length === 0) {
        throw new Error('File comparison requires at least one file path.');
      }
      return { type: 'file', files: inputs };
    } else if (options.generate) {
      return { type: 'stage' };
    } else {
      throw new Error(
        'Invalid command options. Please specify a valid comparison type.',
      );
    }
  }
}
