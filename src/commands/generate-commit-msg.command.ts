import { prompt } from 'enquirer';
import { ICommand } from './command.factory';
import { execSync } from 'child_process';
import { GPTClient } from '@/clients/gpt.client';

function generateGitDiffCommand(options: string[]) {
  if (options.length === 0) {
    return 'git diff --staged'; // 기본 옵션: staged 변경사항 비교
  } else if (options.includes('-b') || options.includes('--branch')) {
    const [branch1, branch2] = options.slice(options.indexOf('-b') + 1); // 브랜치 옵션: 두 브랜치 간의 변경사항 비교
    return `git diff ${branch1}..${branch2}`;
  } else if (options.includes('-c') || options.includes('--commit')) {
    const [commit1, commit2] = options.slice(options.indexOf('-c') + 1); // 커밋 옵션: 두 커밋 간의 변경사항 비교
    return `git diff ${commit1}..${commit2}`;
  } else if (options.includes('-f') || options.includes('--file')) {
    const files = options.slice(options.indexOf('-f') + 1); // 파일 옵션: 특정 파일의 변경사항 비교
    return `git diff -- ${files.join(' ')}`;
  } else {
    return 'git diff --staged'; // 기본 옵션: staged 변경사항 비교
  }
}

const excludeDiffFiles: string[] = [
  'package-lock.json',
  'yarn.lock',
  'dist/*',
  'lib/*',
].map((file) => `':(exclude)${file}'`);

export class GenerateCommitMsgCommand implements ICommand {
  constructor(private gptClient: GPTClient) {}

  async execute(options: { diffOptions?: string[] } = { diffOptions: [] }) {
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

    const diffCommand = generateGitDiffCommand(options.diffOptions);

    const diff = execSync(`${diffCommand} ${excludeDiffFiles.join(' ')}`)
      .toString()
      .trim();

    if (!diff) {
      throw new Error(
        '❌ No diff found! Make sure to specify valid options and staged changes.',
      );
    }

    const message = await this.gptClient.generateCommitMessage(
      commitType,
      diff,
    );

    console.log(message);
  }
}
