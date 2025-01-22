import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  entities: [join(__dirname, 'src/models/*.{ts,js}')],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};
