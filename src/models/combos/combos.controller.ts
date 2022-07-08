import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CombosService } from './combos.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { Combo } from './entities/combo.entity';

@Controller('combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Post()
  create(@Body() createComboDto: CreateComboDto) {
    return this.combosService.create(createComboDto);
  }

  @Get()
  findAll(): Promise<Combo[]> {
    return this.combosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Combo> {
    return this.combosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateComboDto: UpdateComboDto,
  ): Promise<Combo> {
    return this.combosService.update(id, updateComboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Combo> {
    return this.combosService.remove(id);
  }
}
