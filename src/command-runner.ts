import { Command, CommandRunner, Option } from 'nest-commander';
import * as dotenv from 'dotenv';
import { prompt } from 'enquirer';
import { GPTClient } from '@/clients/gpt.client';
import { GitClient } from './clients/git.client';
import { DiffOptionsGenerator } from './clients/diff-options.generator';

dotenv.config();

export type CWCommandOptions = {
  branch?: boolean;
  commit?: boolean;
  file?: boolean;
  generate?: boolean;
};

@Command({
  name: 'cw',
  description: 'Set the API key for external service',
  options: { isDefault: true },
})
export class CWCommandRunner extends CommandRunner {
  constructor(
    private gitClient: GitClient,
    private gptClient: GPTClient,
  ) {
    super();
  }

  async run(inputs: string[], options: CWCommandOptions): Promise<void> {
    const diff = this.gitClient.getDiff(
      DiffOptionsGenerator.generate(options, inputs),
    );

    if (!diff) {
      console.error(
        '❌ No diff found! Make sure to specify valid options and staged changes.',
      );
      return;
    }

    const { commitType } = await prompt<{ commitType: string }>({
      type: 'select',
      name: 'commitType',
      message: 'Select commit type:',
      choices: [
        'feat: Add a new feature.',
        'fix: Correct a bug.',
        'docs: Update documentation.',
        'style: Adjust code formatting.',
        'refactor: Rearrange code without altering functionality.',
        'test: Add or update tests.',
        'chore: Miscellaneous tasks.',
        'perf: Enhance performance.',
        'ci: Modify CI configuration.',
        'build: Change build system or dependencies.',
        'revert: Undo a previous commit.',
      ],
    });

    const message = await this.gptClient.generateCommitMessage(
      commitType,
      diff,
    );

    console.log(message);
  }

  @Option({
    flags: '-g, --generate',
    description: 'Generate a commit message',
  })
  enableGenerate(): any {
    return true;
  }

  @Option({
    flags: '-b, --branch',
    description:
      'Compares changes between two branches and assists in composing a commit message.',
  })
  enableBranchComparison(): any {
    return true;
  }

  @Option({
    flags: '-c, --commit',
    description:
      'Compares changes between two commits and assists in composing a commit message.',
  })
  enableCommitComparison(): any {
    return true;
  }

  @Option({
    flags: '-f, --file',
    description:
      'Analyzes changes in specified files and generates an appropriate commit message.',
  })
  enableFileComparison(): any {
    return true;
  }
}
