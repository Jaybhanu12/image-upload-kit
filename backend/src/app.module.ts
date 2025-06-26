import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';

@Module({
  imports: [ImageUploaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
