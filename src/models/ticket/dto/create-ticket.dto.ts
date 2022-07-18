import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  descont: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  priceId: string;

  @ApiProperty()
  movieId: string;
}
