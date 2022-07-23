import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
<<<<<<< HEAD
  readonly exhibition: string[];
=======
  exhibition: string;
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
}
