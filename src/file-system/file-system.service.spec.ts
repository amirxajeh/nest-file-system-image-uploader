import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';
import * as fs from 'fs';
import { FileSystemService } from './file-system.service';

jest.mock('fs')

// @ts-ignore
fs.existsSync = jest.fn().mockImplementation((filePath: string) => {
  return filePath.split("/").reverse()[0] == VALID_PATH
})

// @ts-ignore
fs.unlinkSync = jest.fn()

const VALID_PATH = "valid.file"
const INVALID_PATH = "invalid.file"

describe('FileSystemService', () => {
  const rootPath = path.resolve(__dirname, "..", "..")
  let service: FileSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileSystemService],
    }).compile();

    service = module.get<FileSystemService>(FileSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should have rootPath property equal to root path of project", () => {

    expect(service.rootPath).toBe(rootPath)
  })

  describe("delete method", () => {
    it("should be defined", () => {
      expect(service.delete).toBeDefined()
    })

    it("should found out that given file is exists or not", () => {

      service.delete(INVALID_PATH)
      expect(fs.existsSync).toReturnWith(false)
    })

    it("should remove file if path is valid", () => {
      service.delete(VALID_PATH)
      expect(fs.unlinkSync).toHaveBeenCalledWith(path.resolve(service.rootPath, VALID_PATH))
    })
  })
});
