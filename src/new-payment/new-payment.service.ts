import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './entities/new-payment.entity';
import { Payee } from '../payee/entities/payee.entity';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NewPaymentService {

constructor(
@InjectModel(Payment.name)
private paymentModel: Model<Payment>,

@InjectModel(Payee.name)
private payeeModel: Model<Payee>
){}

async create(userId: string, companyId: string, data: any){

if(!userId){
throw new BadRequestException("UserId is required")
}

const payment = new this.paymentModel({
...data,
userId,
companyId
})

return payment.save()

}

async saveAndNew(userId: string, companyId: string, data: any){

if(!userId){
throw new BadRequestException("UserId is required")
}

const payment = new this.paymentModel({
...data,
userId,
companyId
})

await payment.save()

return {
message: "Saved successfully"
}

}

async addRemittance(paymentId: string, data: any){

return this.paymentModel.findByIdAndUpdate(
paymentId,
{ $push: { remittance: data } },
{ new: true }
)

}

async uploadAttachment(paymentId: string, file: any){

if(!file){
throw new BadRequestException("File not uploaded")
}

return this.paymentModel.findByIdAndUpdate(
paymentId,
{ $push: { attachments: file.filename } },
{ new: true }
)

}

async addNote(paymentId: string, note: string){

if(!note){
throw new BadRequestException("Note is required")
}

return this.paymentModel.findByIdAndUpdate(
paymentId,
{ $push: { notes: note } },
{ new: true }
)

}

async sendMail(paymentId: string){

const payment = await this.paymentModel.findById(paymentId)

if(!payment){
throw new NotFoundException("Payment not found")
}

const payee = await this.payeeModel.findById(payment.payeeId)

if(!payee){
throw new NotFoundException("Payee not found")
}

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.EMAIL,
pass: process.env.EMAIL_PASS
}
})

await transporter.sendMail({
to: payee.email,
subject: "Payment Check",
text: `You received payment of $${payment.amount}`
})

return {
message: "Mail Sent Successfully"
}

}

async printCheck(paymentId: string){

const payment = await this.paymentModel.findById(paymentId)

if(!payment){
throw new NotFoundException("Payment not found")
}

return {
message: "Check Printed Successfully",
payment
}

}

async sendACH(paymentId: string){

const payment = await this.paymentModel.findById(paymentId)

if(!payment){
throw new NotFoundException("Payment not found")
}

return {
message: "ACH Payment Sent",
payment
}

}

async getPayment(paymentId: string){

const payment = await this.paymentModel.findById(paymentId)

if(!payment){
throw new NotFoundException("Payment not found")
}

return payment

}

}