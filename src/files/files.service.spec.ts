import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';

describe('FileServiceService', () => {
  let filesService: FilesService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [FilesService],
    // }).compile();
    // filesService = module.get<FilesService>(FilesService);
  });

  // describe('makefile', () => {
  //   it('should return "File name"', () => {
  //     expect(filesService.makeFile('.jpg')).toBe(
  //       new Date(Date.now()).toDateString() + '.jpg',
  //     );
  //   });
  // });
});
