import { Module } from '@nestjs/common';
import { CreateFeedbackUseCase } from './useCases/create-feedback.usecase';
import { DatabaseModule } from 'src/shared/database/database.module';
import { RoomsModule } from '../rooms/rooms.module';
import { FeedbackController } from './feedbacks.controller';
import { FeedbackRepository } from './repositories/feedback.repository';
import { ListFeedbacksUseCase } from './useCases/list-feedbacks.usecase';
@Module({
  imports: [
    DatabaseModule,
    RoomsModule, 
  ],
  controllers: [FeedbackController],
  providers: [
    CreateFeedbackUseCase,
    FeedbackRepository,
    ListFeedbacksUseCase,
  ],
})
export class FeedbacksModule {}
