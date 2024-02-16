import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class GPTClient {
  constructor(private apiKey: string) {}

  async generateCommitMessage(
    commitType: string,
    diff: string,
  ): Promise<string> {
    if (!this.apiKey) throw new Error('Please register the API key first.');

    const openai = new OpenAI({ apiKey: this.apiKey });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `As a software developer, summarize this diff in a commit message starting with the prefix derived from ${commitType.split(':')[0]}.`,
        },
        {
          role: 'user',
          content: `diff : ${diff}`,
        },
      ],
      temperature: 0,
      n: 1,
      model: 'gpt-3.5-turbo-1106',
    });

    return completion.choices[0].message.content;
  }
}
