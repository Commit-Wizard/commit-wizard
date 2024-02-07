import * as fs from 'fs-extra';
import * as path from 'path';
import { SetApiKeyCommand } from './set-api-key.command';

jest.mock('fs-extra', () => ({
  existsSync: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));

describe('SetApiKeyCommand', () => {
  const apiKey = 'test-api-key';
  const envPath = path.join(process.cwd(), '.env');

  beforeEach(() => {
    (fs.existsSync as jest.Mock).mockClear();
    (fs.readFile as unknown as jest.Mock).mockClear();
    (fs.writeFile as unknown as jest.Mock).mockClear();
  });

  it('should create a new .env file if it does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.writeFile as unknown as jest.Mock).mockResolvedValue(undefined);

    const command = new SetApiKeyCommand(apiKey);
    await command.execute();

    expect(fs.writeFile).toHaveBeenCalledWith(
      envPath,
      expect.stringContaining(`EXTERNAL_SERVICE_API_KEY=${apiKey}`),
    );
  });

  it('should update the API key in an existing .env file that already includes the key', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFile as unknown as jest.Mock).mockResolvedValue(
      'EXTERNAL_SERVICE_API_KEY=old-value\nSOME_OTHER_KEY=some-value',
    );
    (fs.writeFile as unknown as jest.Mock).mockResolvedValue(undefined);

    const command = new SetApiKeyCommand(apiKey);
    await command.execute();

    expect(fs.writeFile).toHaveBeenCalledWith(
      envPath,
      expect.stringContaining(
        `EXTERNAL_SERVICE_API_KEY=${apiKey}\nSOME_OTHER_KEY=some-value`,
      ),
    );
    expect(fs.writeFile).not.toHaveBeenCalledWith(
      envPath,
      expect.stringContaining('old-value'),
    );
  });

  it('should throw an error if the API key is empty', async () => {
    const command = new SetApiKeyCommand('');

    await expect(command.execute()).rejects.toThrow('Wrong Api Key');
  });
});
