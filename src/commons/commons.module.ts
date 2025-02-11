import { Module } from '@nestjs/common';
import { UrlUtilsService } from './services/url-utils/url-utils.service';

@Module({
  providers: [UrlUtilsService],
  exports: [UrlUtilsService],
})
export class CommonsModule {}
