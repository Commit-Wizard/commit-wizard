export function generateGitDiffCommand(options: string[]) {
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