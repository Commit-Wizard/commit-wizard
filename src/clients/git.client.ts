import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { DiffOptions } from './diff-options.generator';

@Injectable()
export class GitClient {
  private excludeDiffFiles: string[] = [
    'package-lock.json',
    'yarn.lock',
    'dist/*',
    'lib/*',
  ].map((file) => `':(exclude)${file}'`);

  getDiff(diffOptions: DiffOptions) {
    const diffCommand = this.generateGitDiffCommand(diffOptions);
    return execSync(`${diffCommand} ${this.excludeDiffFiles.join(' ')}`)
      .toString()
      .trim();
  }

  private generateGitDiffCommand(diffOption: DiffOptions) {
    switch (diffOption.type) {
      case 'stage':
        return 'git diff --staged'; // 기본 옵션: staged 변경사항 비교

      case 'branch':
        const { branch1, branch2 } = diffOption;
        return `git diff ${branch1}..${branch2}`; // 브랜치 옵션: 두 브랜치 간의 변경사항 비교

      case 'commit':
        const { commit1, commit2 } = diffOption;
        return `git diff ${commit1}..${commit2}`; // 커밋 옵션: 두 커밋 간의 변경사항 비교

      case 'file':
        const { files } = diffOption;
        return `git diff -- ${files.join(' ')}`; // 파일 옵션: 특정 파일의 변경사항 비교

      default:
        return 'git diff --staged'; // 기본 옵션: staged 변경사항 비교
    }
  }
}
