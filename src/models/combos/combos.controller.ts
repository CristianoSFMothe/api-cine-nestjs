import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { UpdatedComboSwagger } from './../../common/swagger/Combo/update-combo.swagger';
import { FindByIdComboSwagger } from './../../common/swagger/Combo/findById-combo.swagger';
import { ShowComboSwagger } from './../../common/swagger/Combo/show-combo.swagger';
import { CreateComboSwagger } from './../../common/swagger/Combo/create-combo.swagger';
import { Combo } from './entities/combo.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CombosService } from './combos.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';

@ApiTags('Combos')
@Controller('api/combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de um combo' })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 201,
    description: 'Combo criado com sucesso',
    type: CreateComboSwagger,
  })
  create(@Body() createComboDto: CreateComboDto): Promise<Combo> {
    return this.combosService.create(createComboDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os combos retornado com sucesso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de combos',
    type: ShowComboSwagger,
    isArray: true,
  })
  findAll(): Promise<Combo[]> {
    return this.combosService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um combo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um combo retornando com sucesso',
    type: FindByIdComboSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Combo não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id') id: string): Promise<Combo> {
    return this.combosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de um combo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Combo atualizado com sucesso',
    type: UpdatedComboSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Combo não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id') id: string,
    @Body() updateComboDto: UpdateComboDto,
  ): Promise<Combo> {
    return this.combosService.update(id, updateComboDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de um combo por ID' })
  @ApiResponse({ status: 204, description: 'Combo removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Combo não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.combosService.remove(id);
  }
}
