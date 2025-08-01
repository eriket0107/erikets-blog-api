import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<PostEntity[]> {
    const post = await this.postService.findAll();
    return post;
  }

  @Get(':id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<PostEntity | null> {
    return await this.postService.find(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() postCreateDto: CreatePostDto) {
    return await this.postService.create(postCreateDto);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() postUpdateDto: UpdatePostDto) {
    return await this.postService.update(id, postUpdateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.postService.delete(id);
  }
}
