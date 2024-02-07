import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ICommand } from './command.factory';

dotenv.config();

export class SetApiKeyCommand implements ICommand {
  constructor(private apiKey: string) {}

  private async writeEnvFile(key: string): Promise<void> {
    const envPath = path.join(process.cwd(), '.env');
    let content = '';

    if (fs.existsSync(envPath)) {
      content = await fs.readFile(envPath, 'utf-8');
    }

    if (content.includes('EXTERNAL_SERVICE_API_KEY=')) {
      content = content.replace(
        /EXTERNAL_SERVICE_API_KEY=.*/,
        `EXTERNAL_SERVICE_API_KEY=${key}`,
      );
    } else {
      content += `\nEXTERNAL_SERVICE_API_KEY=${key}\n`;
    }

    await fs.writeFile(envPath, content);
  }

  async execute() {
    if (!this.apiKey) {
      throw new Error('Wrong Api Key');
    }

    await this.writeEnvFile(this.apiKey);
    console.log('API key has been set.');
  }
}
