import { UpdatedAddressSwagger } from './../../common/swagger/Address/update-address.swagger';
import { FindByIdAddressSwagger } from './../../common/swagger/Address/findById-address.swagger';
import { ShowAddressSwagger } from './../../common/swagger/Address/show-address.swagger';
import { CreateAddressSwagger } from './../../common/swagger/Address/create-address.swagger';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from './../../common/helpers/swagger/not-found.swagger copy';
import { Address } from './entities/address.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Endereço')
@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Endereço' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Criação de endereço com sucesso',
    type: CreateAddressSwagger,
  })
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de todos os endereço retornado com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Listagen um de endereço',
    type: ShowAddressSwagger,
    isArray: true,
  })
  findAll(): Promise<Address[]> {
    return this.addressService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endereço um por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um endereço retornando com sucesso',
    type: FindByIdAddressSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Endereço não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Address> {
    return this.addressService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de uma endereço por ID' })
  @ApiResponse({
    status: 200,
    description: 'Endereço atualizado com sucesso',
    type: UpdatedAddressSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Endereço não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de uma endereço por ID' })
  @ApiResponse({ status: 204, description: 'Endereço removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Endereço não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.addressService.remove(id);
  }
}
