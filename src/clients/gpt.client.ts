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
          content: `You are a software developer. Summarize this diff in a commit message`,
        },
        {
          role: 'user',
          content: `commit type: ${commitType}, diff in a commit message: ${diff}`,
        },
      ],
      temperature: 0,
      n: 1,
      model: 'gpt-3.5-turbo-1106',
    });

    return completion.choices[0].message.content;
  }
}
