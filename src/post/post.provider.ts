import { DataSource } from 'typeorm';
import { Post } from './entity/post.entity';
import { Provider } from '@nestjs/common';

export const postProvider: Provider[] = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: ['DATA_SOURCE'],
  },
];
