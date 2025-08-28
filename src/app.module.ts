import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './modules/movies/movies.module';


@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
