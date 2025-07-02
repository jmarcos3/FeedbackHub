import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';


@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // permite que outros módulos usem
})
export class DatabaseModule {}
