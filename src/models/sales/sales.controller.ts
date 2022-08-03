import { UpdatedSalesSwagger } from './../../common/swagger/Sales/update-sales.swagger';
import { FindByIdSalesSwagger } from './../../common/swagger/Sales/findById-sales.swagger';
import { ShowSalesSwagger } from './../../common/swagger/Sales/show-sales.swagger';
import { CreateSalesSwagger } from './../../common/swagger/Sales/create-sales.swagger';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger';
import { Sale } from './entities/sale.entity';
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
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Vendas')
@Controller('api/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Ingresso de uma sessão' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Ingresso criado com sucesso',
    type: CreateSalesSwagger,
  })
  create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as ingresso retornado com sucesso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ingresso',
    type: ShowSalesSwagger,
    isArray: true,
  })
  findAll(): Promise<Sale[]> {
    return this.salesService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ingresso um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um ingresso retornando com sucesso',
    type: FindByIdSalesSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Ingresso não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Sale> {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de uma ingresso por ID' })
  @ApiResponse({
    status: 200,
    description: 'Ingresso atualizado com sucesso',
    type: UpdatedSalesSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Ingresso não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<Sale> {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de uma ingresso por ID' })
  @ApiResponse({ status: 204, description: 'Ingresso removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Ingresso não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.salesService.remove(id);
  }
}
