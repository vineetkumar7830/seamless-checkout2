import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CheckDraftController } from './check-draft.controller';
import { CheckDraftService } from './check-draft.service';

import { CheckDraft, CheckDraftSchema } from './entities/check-draft.entity';
import { Remittance, RemittanceSchema } from './entities/remittance.schema';
import { Attachment, AttachmentSchema } from './entities/attachment.schema';
import { Comment, CommentSchema } from './entities/comment.schema';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule, // 🔐 JWT STRATEGY + PASSPORT
    MongooseModule.forFeature([
      { name: CheckDraft.name, schema: CheckDraftSchema },
      { name: Remittance.name, schema: RemittanceSchema },
      { name: Attachment.name, schema: AttachmentSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [CheckDraftController],
  providers: [CheckDraftService],
})
export class CheckDraftModule {}
