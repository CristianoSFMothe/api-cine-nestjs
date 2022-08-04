import { Checkout } from './entities/checkout.entity';
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
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Checkout')
@Controller('api/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  create(@Body() createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    return this.checkoutService.create(createCheckoutDto);
  }

  @Get()
  findAll(): Promise<Checkout[]> {
    return this.checkoutService.show();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Checkout> {
    return this.checkoutService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCheckoutDto: UpdateCheckoutDto,
  ): Promise<Checkout> {
    return this.checkoutService.update(id, updateCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.checkoutService.remove(id);
  }
}
