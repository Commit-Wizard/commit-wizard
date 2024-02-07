import { prompt } from 'enquirer';
import { ICommand } from './command.factory';
import { execSync } from 'child_process';
import { GPTClient } from '@/clients/gpt.client';

export class GenerateCommitMsgCommand implements ICommand {
  constructor(private gptClient: GPTClient) {}

  async execute() {
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

    const diff = execSync("git diff --staged -- ':!yarn.lock'").toString();

    if (!diff) {
      throw new Error(
        '❌ No staged diff! Stage the changes you want to commit first.',
      );
    }

    const message = await this.gptClient.generateCommitMessage(
      commitType,
      diff,
    );

    console.log(message);
  }
}
