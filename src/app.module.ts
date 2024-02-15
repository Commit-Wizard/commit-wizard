import { Module } from '@nestjs/common';
import { CWCommandRunner } from './command-runner';
import { GitClient } from './clients/git.client';
import { GPTClient } from './clients/gpt.client';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CWCommandRunner,
    GitClient,
    {
      provide: GPTClient,
      useFactory: () => {
        const apiKey = process.env.EXTERNAL_SERVICE_API_KEY;
        return new GPTClient(apiKey);
      },
    },
  ],
})
export class AppModule {}
