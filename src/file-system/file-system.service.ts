import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileSystemService {
  private _rootPath: string

  constructor() {
    this._rootPath = path.resolve(__dirname, '..', '..')
  }

  get rootPath(): string {
    return this._rootPath
  }

  delete(path: string): void {
    const filePath = this.joinPath(path)
    const isExists = fs.existsSync(filePath)

    if (isExists) {
      fs.unlinkSync(filePath)
    }
  }

  private joinPath(...paths: string[]): string {
    return path.resolve(this._rootPath, ...paths)
  }
}
