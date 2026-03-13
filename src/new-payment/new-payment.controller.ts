import {
Controller,
Post,
Get,
Body,
Req,
Param,
UploadedFile,
UseInterceptors,
UseGuards,
BadRequestException
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { NewPaymentService } from './new-payment.service';
import { CreatePaymentDto } from './dto/create-new-payment.dto';

@Controller('new-payment')
export class NewPaymentController {

constructor(private service: NewPaymentService){}

@UseGuards(AuthGuard('jwt'))
@Post('save')
create(@Req() req, @Body() dto: CreatePaymentDto){

// ✅ JWT strategy se userId aa raha hai
const userId = req.user?.userId
const companyId = req.user?.companyId

if(!userId){
throw new BadRequestException("User not found in token")
}

return this.service.create(userId, companyId, dto)

}

@UseGuards(AuthGuard('jwt'))
@Post('save-new')
saveNew(@Req() req,@Body() dto: CreatePaymentDto){

const userId = req.user?.userId
const companyId = req.user?.companyId

if(!userId){
throw new BadRequestException("User not found in token")
}

return this.service.saveAndNew(userId, companyId, dto)

}

@Post('remittance/:id')
addRemittance(@Param('id') id: string,@Body() body){

return this.service.addRemittance(id,body)

}

@Post('upload/:id')
@UseInterceptors(FileInterceptor('file'))
uploadFile(
@Param('id') id: string,
@UploadedFile() file
){

return this.service.uploadAttachment(id,file)

}

@Post('add-note/:id')
addNote(@Param('id') id: string,@Body() body){

return this.service.addNote(id,body.note)

}

@Post('mail-check/:id')
sendMail(@Param('id') id: string){

return this.service.sendMail(id)

}

@Post('print/:id')
printCheck(@Param('id') id: string){

return this.service.printCheck(id)

}

@Post('send-ach/:id')
sendAch(@Param('id') id: string){

return this.service.sendACH(id)

}

@Get(':id')
getPayment(@Param('id') id: string){

return this.service.getPayment(id)

}

}