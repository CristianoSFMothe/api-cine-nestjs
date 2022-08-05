import { CreateUsersSwagger } from './../../common/swagger/Users/create-users.swagger';
import { UpdatedUsersSwagger } from './../../common/swagger/Users/update-users.swagger';
import { FindByIdUsersSwagger } from './../../common/swagger/Users/findById-users.swagger';
import { ShowUsersSwagger } from './../../common/swagger/Users/show-users.swagger';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from './../../common/helpers/swagger/not-found.swagger copy';
import { User } from './entities/user.entity';
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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('usuários')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuários' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: CreateUsersSwagger,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de todos os usuários retornado com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de ingresso',
    type: ShowUsersSwagger,
    isArray: true,
  })
  findAll(): Promise<User[]> {
    return this.usersService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de um usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um usuário retornando com sucesso',
    type: FindByIdUsersSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de um usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UpdatedUsersSwagger,
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
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de um usuário por ID' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
