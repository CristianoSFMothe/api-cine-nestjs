import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Address } from './entities/address.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressModel: Repository<Address>,
  ) {}

  async create(data: CreateAddressDto): Promise<Address> {
    const address = this.addressModel.create(data);

    return await this.addressModel.save(address);
  }

  async show(): Promise<Address[]> {
    const address = await this.addressModel.find();

    if (address.length < 1) {
      throw new HttpException(
        MessagesHelper.ADDRESS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return address;
  }

  async findById(id: string): Promise<Address> {
    const address = await this.addressModel.findOneOrFail({
      where: { id: id },
    });

    if (!address) {
      throw new NotFoundException(MessagesHelper.ADDRESS_NOT_FOUND);
    }
    return address;
  }

  async update(id: string, data: UpdateAddressDto): Promise<Address> {
    const address = await this.addressModel.preload({
      id,
      ...data,
    });

    if (!address) {
      throw new NotFoundException(MessagesHelper.ADDRESS_NOT_FOUND);
    }
    return await this.addressModel.save(address);
  }

  async remove(id: string): Promise<void> {
    const address = await this.addressModel.findOneOrFail({
      where: { id: id },
    });

    if (!address) {
      throw new NotFoundException(MessagesHelper.ADDRESS_NOT_FOUND);
    }

    await this.addressModel.softDelete(id);
  }
}
