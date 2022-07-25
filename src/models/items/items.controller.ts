import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from './../../common/helpers/swagger/not-found.swagger copy';
import { UpdatedItemSwagger } from '../../common/swagger/Item/update-item.swagger';
import { FindByIdComboSwagger } from './../../common/swagger/Combo/findById-combo.swagger';
import { ShowComboSwagger } from './../../common/swagger/Combo/show-combo.swagger';
import { CreateComboSwagger } from './../../common/swagger/Combo/create-combo.swagger';
import { Item } from './entities/item.entity';
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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Itens')
@Controller('api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de um item' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Item criado com sucesso',
    type: CreateComboSwagger,
  })
  create(@Body() data: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os itens retornado com sucesso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de itens',
    type: ShowComboSwagger,
    isArray: true,
  })
  findAll(): Promise<Item[]> {
    return this.itemsService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um item retornando com sucesso',
    type: FindByIdComboSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Item não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Item> {
    return this.itemsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Item atualizado com sucesso',
    type: UpdatedItemSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Item não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateItem(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de um item por ID' })
  @ApiResponse({ status: 204, description: 'Item removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Item não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.itemsService.removeItem(id);
  }
}
