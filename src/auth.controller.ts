import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Get()
  getUsersInAuth() {
    return this.client.send({ role: 'auth', cmd: 'get_users' }, {});
  }
}
