import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) { }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async createPost(post: Post): Promise<string> {
    await this.postRepository.save(post);
    return 'OK';
  }
}
