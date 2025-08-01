import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { Post } from './entity/post.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    this.logger.log(`Stating [findAll]...`);

    const posts = await this.postRepository.find();

    if (!posts.length) {
      this.logger.log(`Posts are empty.`);
    } else {
      this.logger.log(`Found ${posts.length} posts.`);
    }

    this.logger.log('Finishing [findAll]...');
    return posts;
  }

  async find(id: string): Promise<Post | null> {
    this.logger.log(`Starting [find] for post with id: ${id}`);

    const post = await this.postRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!post) {
      const errorMessage = `Post with id: ${id} not found.`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    this.logger.log(`Found post with id: ${id}`);
    this.logger.log('Finishing [find]...');
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    this.logger.log(
      `Starting [create] with payload: ${JSON.stringify(createPostDto)}`,
    );

    const requiredFields = ['title', 'description', 'text'];
    const missingFields = requiredFields.filter(
      (field) => !createPostDto[field],
    );

    if (missingFields.length) {
      const errorMessage = `Missing properties: ${missingFields.join(', ')}`;
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    const postToCreate = {
      ...createPostDto,
      date: createPostDto.date ? new Date(createPostDto.date) : new Date(),
    };
    this.logger.log('Creating post...');
    const postCreated = await this.postRepository.save(postToCreate);

    if (postCreated && postCreated._id) {
      this.logger.log(
        `Post with id: ${postCreated._id.toHexString()} created successfully.`,
      );
    } else {
      this.logger.error('Post creation failed or id is missing.');
    }

    this.logger.log(`Finishing [create]...`);
    return postCreated;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    this.logger.log(
      `Starting [update] for post with id: ${id} and payload: ${JSON.stringify(
        updatePostDto,
      )}`,
    );

    if (!id) {
      throw new BadRequestException('Post Id is missing.');
    }

    const postToUpdate = await this.postRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!postToUpdate) {
      const errorMessage = `Post with id: ${id} not found.`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    this.logger.log(`Updating post with id: ${id}`);

    const updatedPost = this.postRepository.create({
      _id: postToUpdate._id,
      ...updatePostDto,
    });

    const postSaved = await this.postRepository.save(updatedPost);

    this.logger.log(`Post with id: ${id} updated successfully.`);
    this.logger.log(`Finishing [update]...`);
    return postSaved;
  }

  async delete(id: string): Promise<DeleteResult> {
    this.logger.log(`Starting [delete] for post with id: ${id}`);
    if (!id) throw new BadRequestException('Id is missing.');

    const postToDelete = await this.postRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!postToDelete) {
      const errorMessage = `Post with id: ${id} not found.`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    const postDeleted = await this.postRepository.delete(new ObjectId(id));

    this.logger.log(`Post with id: ${id} deleted successfully.`);
    this.logger.log(`Finishing [delete]...`);
    return postDeleted;
  }
}
