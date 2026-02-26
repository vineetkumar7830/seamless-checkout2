import { Controller, Post, Get, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { NotificationService } from './notification.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyNotifications(@GetUser('userId') userId: string, @Query('unreadOnly') unreadOnly: string = 'false') {
    return this.notificationService.getMyNotifications(userId, unreadOnly === 'true');
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id/read')
  async markAsRead(@GetUser('userId') userId: string, @Param('id') id: string) {
    return this.notificationService.markAsRead(id, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post('send')
  async sendNotification(
    @Body() body: {
      userId?: string;
      title: string;
      message: string;
      type?: string;
      actionUrl?: string;
      template?: string;
    },
  ) {
    if (body.userId) {
      return this.notificationService.sendToUser(
        body.userId,
        body.title,
        body.message,
        body.type,
        body.actionUrl,
        body.template,
      );
    } else {

      return this.notificationService.broadcast(
        body.title,
        body.message,
        body.type,
        {},
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Get('logs')
  async getNotificationLogs(@Query() query: any) {
    return this.notificationService.getNotificationLogs(query);
  }
}