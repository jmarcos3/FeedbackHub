import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, 
    AuthModule, RoomsModule, FeedbacksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
