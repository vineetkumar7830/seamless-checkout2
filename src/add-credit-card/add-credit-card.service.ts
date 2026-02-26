import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  AddCreditCard,
  AddCreditCardDocument,
} from './entities/add-credit-card.entity';

import { AddCreditCardDto } from './dto/create-add-credit-card.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AddCreditCardService {
  constructor(
    @InjectModel(AddCreditCard.name)
    private readonly cardModel: Model<AddCreditCardDocument>,
  ) {}

  // ✅ ADD CARD (SaaS Based)
  async addCard(
    dto: AddCreditCardDto,
    companyId: string,
    userId: string,
  ) {
    try {
      const card = await this.cardModel.create({
        ...dto,
        companyId,
        userId: new Types.ObjectId(userId),
      });

      return new CustomResponse(
        201,
        'Credit card added successfully',
        this.formatCard(card),
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ GET ALL (Company Filter)
  async getAllCards(companyId: string) {
    try {
      const cards = await this.cardModel
        .find({ companyId })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Credit cards fetched successfully',
        cards.map((card) => this.formatCard(card)),
      );
    } catch (error) {
      throwException(error);
    }
  }

  private formatCard(card: AddCreditCardDocument) {
    return {
      id: card._id,
      firstName: card.firstName,
      lastName: card.lastName,
      email: card.email,
      address: {
        addressLine1: card.addressLine1,
        addressLine2: card.addressLine2,
        city: card.city,
        state: card.state,
        zip: card.zip,
        country: card.country,
      },
      card: {
        last4: card.cardNumber.slice(-4),
        expiryDate: card.expiryDate,
      },
      createdAt: card.createdAt,
    };
  }
}