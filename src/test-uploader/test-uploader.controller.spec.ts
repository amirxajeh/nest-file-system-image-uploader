import { Test, TestingModule } from '@nestjs/testing';
import { TestUploaderController } from './test-uploader.controller';

describe('TestUploaderController', () => {
  let controller: TestUploaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestUploaderController],
    }).compile();

    controller = module.get<TestUploaderController>(TestUploaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
