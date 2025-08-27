import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { HashService } from './services/hash.service';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from 'src/shared/database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [HashService,
    UserRepository,
    CreateUserUseCase,
  ],
  exports: [UserRepository, HashService],
})
export class UsersModule {}
