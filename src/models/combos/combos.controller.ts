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
import { ApiTags } from '@nestjs/swagger';
import { CombosService } from './combos.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';

@ApiTags('Combos')
@Controller('api/combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Post()
  create(@Body() createComboDto: CreateComboDto): Promise<Combo> {
    return this.combosService.create(createComboDto);
  }

  @Get()
  findAll(): Promise<Combo[]> {
    return this.combosService.show();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Combo> {
    return this.combosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComboDto: UpdateComboDto) {
    return this.combosService.update(id, updateComboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.combosService.remove(id);
  }
}
