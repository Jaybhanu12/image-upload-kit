import { Module } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';

@Module({
  controllers: [],
  providers: [ImageUploaderService],
})
export class ImageUploaderModule {}
