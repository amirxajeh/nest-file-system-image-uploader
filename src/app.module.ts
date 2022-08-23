import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemService } from './file-system/file-system.service';
import { TestUploaderController } from './test-uploader/test-uploader.controller';

@Module({
  imports: [],
  controllers: [AppController, TestUploaderController],
  providers: [AppService, FileSystemService],
})
export class AppModule {}
