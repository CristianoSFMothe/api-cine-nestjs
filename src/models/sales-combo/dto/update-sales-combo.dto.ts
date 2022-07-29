import { PartialType } from '@nestjs/swagger';
import { CreateSalesComboDto } from './create-sales-combo.dto';

export class UpdateSalesComboDto extends PartialType(CreateSalesComboDto) {}
