import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class DashboardService {

  // ================= CREATE =================
  async create(createDashboardDto: CreateDashboardDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      return new CustomResponse(
        201,
        'Dashboard created successfully',
        { ...createDashboardDto, companyId },
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ALL =================
  async findAll(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      return new CustomResponse(
        200,
        'Dashboards fetched successfully',
        [],
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ONE =================
  async findOne(id: number) {
    try {
      if (!id) {
        throw new CustomError(400, 'Dashboard id is required');
      }

      return new CustomResponse(
        200,
        `Dashboard fetched successfully`,
        { id },
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= UPDATE =================
  async update(id: number, updateDashboardDto: UpdateDashboardDto) {
    try {
      if (!id) {
        throw new CustomError(400, 'Dashboard id is required');
      }

      return new CustomResponse(
        200,
        `Dashboard updated successfully`,
        {
          id,
          ...updateDashboardDto,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= DELETE =================
  async remove(id: number) {
    try {
      if (!id) {
        throw new CustomError(400, 'Dashboard id is required');
      }

      return new CustomResponse(
        200,
        `Dashboard removed successfully`,
        null,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
