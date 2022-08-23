import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function Upload(fieldName: string, options?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, options))
  );
}