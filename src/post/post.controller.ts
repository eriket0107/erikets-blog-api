import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostCreateDto } from './dto/post-create-dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<PostEntity[]> {
    const post = await this.postService.findAll();
    return post;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() postCreateDto: PostCreateDto) {
    return await this.postService.createPost(postCreateDto);
  }
}
