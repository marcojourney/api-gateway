import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';

@Controller('users')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }
}
