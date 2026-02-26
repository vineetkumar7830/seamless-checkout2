import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecentActivityController } from './recent-activity.controller';
import { RecentActivityService } from './recent-activity.service';
import { RecentActivity, RecentActivitySchema } from './entities/recent-activity.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecentActivity.name, schema: RecentActivitySchema },
    ]),
  ],
  controllers: [RecentActivityController],
  providers: [RecentActivityService],
})
export class RecentActivityModule {}
