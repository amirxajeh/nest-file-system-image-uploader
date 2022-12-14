import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Upload } from '../decotators/upload.decorator';
import { LocalFilesInterceptor } from '../interceptor/upload.interceptor';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "public", "uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extention = file.mimetype.split("/")[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + extention)
  },
})

@Controller('test-uploader')
export class TestUploaderController {

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", { storage }))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }

  @Post("upload-create-file")
  @Upload('file')
  uploadCreateFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 * 1000 }),
        new FileTypeValidator({ fileType: 'jpeg|png|text' })
      ]
    })
  ) file: Express.Multer.File) {
    return file
  }

  @Post("custom-upload")
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path: '/uploads'
  }))
  customUpload(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}
