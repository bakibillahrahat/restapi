import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/AuthModule';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
