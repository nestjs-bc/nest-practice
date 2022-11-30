import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/utils/transform.Intercepter';
import { saveImageToStorage } from './files.service';
import { FilesService } from './files.service';

@Controller('files')
@UseInterceptors(TransformInterceptor)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ): any {
    //console.log(file);
    return { message: 'File saved successfully', result: file };
  }

  @Post('DBupload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadFile_DB(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ): any {
    //console.log(file);
    const result =
      (this.filesService.createFile({
        id: null,
        originalName: file.originalname,
        uuid: file.filename,
        filePath: file.path,
      }),
      file);

    return { message: 'File saved in DB successfully', result };
  }
}
