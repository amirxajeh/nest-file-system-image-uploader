import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
}

export function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const filesDestination = path.resolve(__dirname, "..", "..", "public");

      const destination = `${filesDestination}${options.path}`

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination: (req, file, cb) => {
            cb(null, destination)
          },
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extention = file.mimetype.split("/")[1]
            cb(null, file.fieldname + '-' + uniqueSuffix + "." + extention)
          },
        })
      }

      this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions));
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      console.log("hiiiiii", args)
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}
