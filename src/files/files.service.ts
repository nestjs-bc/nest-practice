import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { File } from './file.entity';
import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private dataSource: DataSource,
  ) {}

  //   getOriginalImgName(email: string) {
  //     return this.profileRepository.findOneBy({ email });
  //   }

  //   getUuidImgName(email: string) {
  //     return this.profileRepository.findOneBy({ email });
  //   }
  async createFile(file: File) {
    const fileData = this.fileRepository.create(file);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(fileData);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  makeFile = (fileExtension) => {
    const date = new Date(Date.now()).toDateString();
    const fileName = date + fileExtension;
    return fileName;
  };
}

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './storage/uploads',
    filename: (req, file, cb) => {
      const fileExtension: string = path.extname(file.originalname);
      const fileName: string = makeFile(fileExtension);
      cb(null, fileName);
    },
  }),
};

const makeFile = (fileExtension) => {
  const today = Date.now().toString();
  const fileName = uuid() + '_' + today + fileExtension;
  return fileName;
};
