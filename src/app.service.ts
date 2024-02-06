import { Command, CommandRunner, Option } from 'nest-commander';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Command({ name: 'set-key', description: 'Set the API key for external service' })
export class SetKeyCommand extends CommandRunner {
  private async writeEnvFile(key: string): Promise<void> {
    const envPath = path.join(process.cwd(), '.env');
    let content = '';

    if (fs.existsSync(envPath)) {
      content = await fs.readFile(envPath, 'utf-8');
    }

    if (content.includes('EXTERNAL_SERVICE_API_KEY=')) {
      content = content.replace(/EXTERNAL_SERVICE_API_KEY=.*/, `EXTERNAL_SERVICE_API_KEY=${key}`);
    } else {
      content += `\nEXTERNAL_SERVICE_API_KEY=${key}\n`;
    }

    await fs.writeFile(envPath, content);
  }

  async run(inputs: string[], options?: { key?: string }): Promise<void> {
    if (options?.key) {
      await this.writeEnvFile(options.key);
      console.log('API key has been set.');
    } else {
      console.error('No API key provided.');
    }
  }

  @Option({
    flags: '-k, --key [key]',
    description: 'The API key for the external service',
  })
  parseKey(key: string): any {
    return key;
  }
}

@Command({ name: 'get-key', description: 'Get the API key for external service' })
export class GetKeyCommand extends CommandRunner {
  async run(): Promise<void> {
    const key = process.env.EXTERNAL_SERVICE_API_KEY;
    if (key) {
      console.log(`Current API key is: ${key}`);
    } else {
      console.error('No API key is set.');
    }
  }
}