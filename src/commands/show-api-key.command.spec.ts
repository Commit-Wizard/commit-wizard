import { ShowApiKeyCommand } from './show-api-key.command';

describe('ShowApiKeyCommand', () => {
  // 환경 변수와 콘솔 로그를 모킹하기 위한 설정
  const originalEnv = process.env;
  const logSpy = jest.spyOn(console, 'log');
  const errorSpy = jest.spyOn(console, 'error');

  beforeEach(() => {
    // 환경 변수를 위한 클린업
    jest.resetModules();
    process.env = { ...originalEnv };
    logSpy.mockClear();
    errorSpy.mockClear();
  });

  afterAll(() => {
    // 테스트가 끝난 후 원래 환경 변수로 복원
    process.env = originalEnv;
  });

  it('should display the API key when it is set in the environment variables', () => {
    process.env.EXTERNAL_SERVICE_API_KEY = 'test-api-key';
    const command = new ShowApiKeyCommand();
    command.execute();
    expect(logSpy).toHaveBeenCalledWith('Current API key: test-api-key');
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should display an error message when the .env file is missing and no API key is set', () => {
    delete process.env.EXTERNAL_SERVICE_API_KEY;
    const command = new ShowApiKeyCommand();
    command.execute();
    expect(errorSpy).toHaveBeenCalledWith('No API key has been set.');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should display an error message when the .env file exists but no API key is set', () => {
    delete process.env.EXTERNAL_SERVICE_API_KEY;
    const command = new ShowApiKeyCommand();
    command.execute();
    expect(errorSpy).toHaveBeenCalledWith('No API key has been set.');
    expect(logSpy).not.toHaveBeenCalled();
  });
});
