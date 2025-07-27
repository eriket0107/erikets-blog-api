import { env } from 'src/env';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        host: env.NODE_ENV !== 'prod' ? env.MONGO_HOST : 'localhost',
        port: 27017,
        username: env.MONGO_USER,
        password: env.MONGO_PASS,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '../database/migrations/**/*{.ts,.js}'],
        synchronize: env.NODE_ENV !== 'prod',
      });

      return dataSource.initialize();
    },
  },
];
