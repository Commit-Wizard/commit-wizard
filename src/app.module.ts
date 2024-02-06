import { Module } from '@nestjs/common';
import { SetKeyCommand, GetKeyCommand } from './app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SetKeyCommand, GetKeyCommand],
})
export class AppModule {}
