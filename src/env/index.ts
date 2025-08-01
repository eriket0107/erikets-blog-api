import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().int().positive().default(3333),
  JWT_SECRET: z.string().optional().default('testJWT'),
  MONGO_DATABASE_URL: z
    .string()
    .optional()
    .default('mongodb://localhost:27017/'),
  MONGO_USER: z.string().optional().default('root'),
  MONGO_PASS: z.string().optional().default('root'),
  MONGO_HOST: z.string().optional(),
  FRONTEND_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid envoriment variables', _env.error);
  throw new Error('Invalid envoriment variables');
}
export const env = _env.data;
