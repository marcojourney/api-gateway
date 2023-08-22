import { 
  Controller, 
  Headers, 
  Inject, 
  Ip, 
  Post, 
  Req
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('login')
  signIn(
    @Req() req: Request,
    @Ip() ip: string,
    @Headers('username') username: string,
    @Headers('password') password: string,
  ) {
    const userAgent = req.headers['user-agent'];
    return this.client.send({ cmd: 'auth_login' }, { username, password, ip, userAgent });
  }
}
