import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProvider } from './post.provider';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...postProvider, PostService],
  exports: [PostService],
})
export class PostModule {}
