import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Inject, 
  Param, 
  Post, 
  Put, 
  UseGuards 
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.client.send({ cmd: 'get_user' }, id);
  }

  @Post()
  createUser(@Body() createUserDto: any) {
    return this.client.send({ cmd: 'create_user' }, createUserDto);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: any
  ) {
    return this.client.send({ cmd: 'update_user' }, {id, ...updateUserDto});
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_user' }, +id);
  }
}
