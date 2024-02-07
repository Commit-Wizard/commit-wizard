import { ICommand } from './command.factory';
import * as dotenv from 'dotenv';

dotenv.config();

export class ShowApiKeyCommand implements ICommand {
  execute() {
    const apiKey = process.env.EXTERNAL_SERVICE_API_KEY;

    if (apiKey) {
      console.log(`Current API key: ${apiKey}`);
    } else {
      console.error('No API key has been set.');
    }
  }
}
