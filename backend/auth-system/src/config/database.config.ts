import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Session } from '../entities/session.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  
  return {
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [User, Session],
    
    // Configuración de pool de conexiones
    extra: {
      connectionLimit: isProduction ? 20 : 10,
      acquireTimeout: 60000,
      timeout: 60000,
      charset: 'utf8mb4_unicode_ci',
    },
    
    // Configuraciones por ambiente
    synchronize: !isProduction,
    logging: !isProduction ? ['query', 'error'] : ['error'],
    cache: isProduction ? {
      duration: 30000, // 30 segundos
    } : false,
    
    // Configuración de SSL para producción
    ssl: isProduction ? {
      rejectUnauthorized: false,
    } : false,
    
    // Configuración de timezone
    timezone: 'Z',
    
    // Configuración de migraciones
    migrations: ['dist/migrations/*.js'],
    migrationsRun: isProduction,
    
    // Configuración de subscribers
    subscribers: ['dist/subscribers/*.js'],
    
    // Configuración de CLI
    cli: {
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers',
    },
  };
};