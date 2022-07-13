import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateExhibitionDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
