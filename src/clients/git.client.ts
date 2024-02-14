class GitClient {
    static generateGitDiffCommand(options) {
      if (options.length === 0) {
        return 'git diff --staged'; // 기본 옵션: staged 변경사항 비교
      } else if (options.includes('-b') || options.includes('--branch')) {
        const index = options.indexOf('-b') !== -1 ? options.indexOf('-b') : options.indexOf('--branch');
        const [branch1, branch2] = options.slice(index + 1); // 브랜치 옵션: 두 브랜치 간의 변경사항 비교
        return `git diff ${branch1}..${branch2}`;
      } else if (options.includes('-c') || options.includes('--commit')) {
        const index = options.indexOf('-c') !== -1 ? options.indexOf('-c') : options.indexOf('--commit');
        const [commit1, commit2] = options.slice(index + 1); // 커밋 옵션: 두 커밋 간의 변경사항 비교
        return `git diff ${commit1}..${commit2}`;
      } else if (options.includes('-f') || options.includes('--file')) {
        const index = options.indexOf('-f') !== -1 ? options.indexOf('-f') : options.indexOf('--file');
        const files = options.slice(index + 1); // 파일 옵션: 특정 파일의 변경사항 비교
        return `git diff -- ${files.join(' ')}`;
      } else {
        return 'git diff --staged'; // 기본 옵션: staged 변경사항 비교
      }
    }
  }  