import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

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
}
