# Commit Wizard

Commit Wizard은 외부 서비스의 API 키를 설정하고 관리하며, 커밋 메시지를 자동으로 생성하는 도구입니다.

## Description / 설명

Commit Wizard provides functionalities to set and manage the API key for an external service, and automatically generate commit messages.

Commit Wizard은 외부 서비스의 API 키를 설정하고 관리하며, 커밋 메시지를 자동으로 생성하는 기능을 제공합니다.

## Installation / 설치

```bash
npm install commit-wizard
```

## Usage / 사용법

- `-k, --key [key]`: 외부 서비스의 API 키를 설정합니다.
- `-s, --show-key`: 현재 설정된 API 키를 표시합니다.
- `-g, --generate-commit-msg`: 커밋 메시지를 자동으로 생성합니다.

### Set Key / API 키 설정

Set the API key for the external service.

```bash
cw -k YOUR_API_KEY
```

### Show Key / API 키 표시

Show the current API key.

```bash
cw -s
```

### Generate Commit Message / 커밋 메시지 생성

Generate a commit message automatically.

```bash
cw -g
```

## Advanced Usage / 고급 사용법
- `-b` 또는 `--branch`: 두 브랜치 간의 변경사항 비교
- `-c` 또는 `--commit`: 두 커밋 간의 변경사항 비교
- `-f` 또는 `--file`: 특정 파일의 변경사항 비교

아래는 변경사항을 비교하는 옵션을 사용하는 방법입니다:

1. **두 브랜치 간의 변경사항 비교 (-b 또는 --branch):**
   ```bash
   cw -b branch1 branch2
   ```
   이 명령은 `branch1`과 `branch2` 간의 변경사항을 비교합니다.

2. **두 커밋 간의 변경사항 비교 (-c 또는 --commit):**
   ```bash
   cw -c commit1 commit2
   ```
   이 명령은 `commit1`과 `commit2` 간의 변경사항을 비교합니다.

3. **특정 파일의 변경사항 비교 (-f 또는 --file):**
   ```bash
   cw -f file1 file2
   ```
   이 명령은 `file1`과 `file2`의 변경사항을 비교합니다.


## License / 라이선스

MIT License

Copyright (c) 2024 gimseonjin616, Misong Go(miniPinetree)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
