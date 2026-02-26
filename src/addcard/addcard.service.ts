import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AddCard, AddCardDocument } from './entities/addcard.entity';
import { CreateCardStep1Dto } from './dto/create-card-step1.dto';
import { CreateCardStep2Dto } from './dto/create-card-step2.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AddCardService {
  constructor(
    @InjectModel(AddCard.name)
    private readonly addCardModel: Model<AddCardDocument>,
  ) {}

  // ✅ ADD CARD (STEP 1)
  async addCard(dto: CreateCardStep1Dto, user: any) {
    try {
      if (!user?.userId || !user?.companyId) {
        throw new CustomError(400, 'Invalid token data');
      }

      const card = await this.addCardModel.create({
        nickname: dto.nickname,
        cardProvider: dto.cardProvider,
        color: dto.color,
        userId: new Types.ObjectId(user.userId),
        companyId: new Types.ObjectId(user.companyId),
        email: user.email,
      });

      return new CustomResponse(201, 'Card basic info saved successfully', {
        cardId: card._id,
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ ADD CREDIT CARD (STEP 2)
  async addCreditCard(
    cardId: string,
    dto: CreateCardStep2Dto,
    user: any,
  ) {
    try {
      if (!user?.userId || !user?.companyId) {
        throw new CustomError(400, 'Invalid token data');
      }

      const card = await this.addCardModel.findOne({
        _id: new Types.ObjectId(cardId),
        userId: new Types.ObjectId(user.userId),
        companyId: new Types.ObjectId(user.companyId),
      }) as AddCardDocument;

      if (!card) {
        throw new CustomError(404, 'Card not found');
      }

      card.firstName = dto.firstName;
      card.lastName = dto.lastName;
      card.addressLine1 = dto.addressLine1;
      card.addressLine2 = dto.addressLine2;
      card.city = dto.city;
      card.state = dto.state;
      card.zip = dto.zip;
      card.country = dto.country;

      card.cardNumber = dto.cardNumber;
      card.expiryDate = dto.expiryDate;
      card.cvv = dto.cvv;

      await card.save();

      return new CustomResponse(
        200,
        'Credit Card added successfully',
        card,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ GET MY CARDS
  async getMyCards(user: any) {
    try {
      if (!user?.userId || !user?.companyId) {
        throw new CustomError(400, 'Invalid token data');
      }

      const cards = await this.addCardModel.find({
        userId: new Types.ObjectId(user.userId),
        companyId: new Types.ObjectId(user.companyId),
      });

      return new CustomResponse(
        200,
        'Cards fetched successfully',
        cards,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ UPDATE CARD
  async updateCard(
    cardId: string,
    dto: Partial<CreateCardStep1Dto & CreateCardStep2Dto>,
    user: any,
  ) {
    try {
      if (!user?.userId || !user?.companyId) {
        throw new CustomError(400, 'Invalid token data');
      }

      const card = await this.addCardModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(cardId),
          userId: new Types.ObjectId(user.userId),
          companyId: new Types.ObjectId(user.companyId),
        },
        { $set: dto },
        { new: true },
      );

      if (!card) {
        throw new CustomError(404, 'Card not found');
      }

      return new CustomResponse(
        200,
        'Card updated successfully',
        card,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ DELETE CARD
  async deleteCard(cardId: string, user: any) {
    try {
      if (!user?.userId || !user?.companyId) {
        throw new CustomError(400, 'Invalid token data');
      }

      const card = await this.addCardModel.findOneAndDelete({
        _id: new Types.ObjectId(cardId),
        userId: new Types.ObjectId(user.userId),
        companyId: new Types.ObjectId(user.companyId),
      });
      if (!card) {
        throw new CustomError(404, 'Card not found');
      }
      if (!card) {
        throw new CustomError(404, 'Card not found');
      }

      return new CustomResponse(
        200,
        'Card deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
    }
  }
}