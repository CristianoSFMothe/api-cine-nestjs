import { UpdatedSalesSwagger } from './../../common/swagger/Sales/update-sales.swagger';
import { FindByIdSalesSwagger } from './../../common/swagger/Sales/findById-sales.swagger';
import { ShowSalesSwagger } from './../../common/swagger/Sales/show-sales.swagger';
import { CreateSalesSwagger } from './../../common/swagger/Sales/create-sales.swagger';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger copy';
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
  @ApiOperation({ summary: 'Criação de vendas' })
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
  @ApiOperation({
    summary: 'Listagem de  todas as vendas retornado com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vendas',
    type: ShowSalesSwagger,
    isArray: true,
  })
  findAll(): Promise<Sale[]> {
    return this.salesService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de uma venda por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um venda retornando com sucesso',
    type: FindByIdSalesSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Venda não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Sale> {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de uma venda por ID' })
  @ApiResponse({
    status: 200,
    description: 'Venda atualizado com sucesso',
    type: UpdatedSalesSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Venda não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<Sale> {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de uma venda por ID' })
  @ApiResponse({ status: 204, description: 'Venda removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Venda não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.salesService.remove(id);
  }
}
