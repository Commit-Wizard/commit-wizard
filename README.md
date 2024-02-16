# Commit Wizard

## Description / 설명

Commit Wizard provides functionalities to set and manage the GPT API key for an external service, 
and automatically generate commit messages.

## Installation / 설치

```bash
npm install -g @cw-commit-wizard/commit-wizard
```

```bash
yarn global add @cw-commit-wizard/commit-wizard
```

## Usage / 사용법

- `-k, --key [key]`: Set the API key for an external service.
- `-s, --show-key`: Display the currently configured API key.
- `-g, --generate-commit-msg`: Automatically generate the commit message.

### Set Key / API 키 설정

Set the API key for the external service.

```bash
cw -k YOUR_GPT_API_KEY
```
If you don't have an GPT API key, you can find it [here](https://platform.openai.com/account/api-keys).


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

- `-b` or `--branch`: Compare changes between two branches.
- `-c` or `--commit`: Compare changes between two commits.
- `-f` or `--file`: Compare changes for a specific file.


1. **Compare changes between two branches (-b or --branch):**
   ```bash
   cw -b branch1 branch2
   ```
   This command compares the changes between `branch1` and `branch2`.

2. **Compare changes between two commits (-c or --commit):**
   ```bash
   cw -c commit1 commit2
   ```
   This command compares the changes between `commit1` and `commit2`.

3. **Compare changes for a specific file (-f or --file):**
   ```bash
   cw -f file1 file2
   ```
   This command compares the changes for `file1` and `file2`.


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
