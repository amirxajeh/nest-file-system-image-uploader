import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemService } from './file-system/file-system.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FileSystemService],
})
export class AppModule {}
