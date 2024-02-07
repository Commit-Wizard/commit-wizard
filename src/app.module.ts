import { Module } from '@nestjs/common';
import { CWCommandRunner } from './commit-wizard.command-runner';

@Module({
  imports: [],
  controllers: [],
  providers: [CWCommandRunner],
})
export class AppModule {}
