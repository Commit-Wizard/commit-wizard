# Commit-Wizard

Commit-Wizard is a command-line interface for generating commit messages by GPT.

## Installation

```bash
npm install -g commit-wizard
```

## Usage

```bash
cw [options]
```

## Options

- `-k, --key [key]`: Set the GPT API key.
- `-s, --show-key`: Show the current API key.
- `-g, --generate-commit-msg`: Generate a commit message.

## Examples

### Set API Key

```bash
cw -k your-GPT-api-key
```
If you don't have a GPT API key, you can obtain one from the OpenAI website: [OpenAI API](https://openai.com/product).

### Show Current API Key

```bash
cw -s
```

### Generate Commit Message

```bash
cw -g
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## MIT License

Copyright (c) 2024 gimseonjin616 and Misong

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
