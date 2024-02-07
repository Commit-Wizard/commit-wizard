import { OpenAI } from 'openai';

export class GPTClient {
  private openai: OpenAI;

  constructor(private apiKey: string) {
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  async generateCommitMessage(
    commitType: string,
    diff: string,
  ): Promise<string> {
    const completion = await this.openai.chat.completions.create({
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
