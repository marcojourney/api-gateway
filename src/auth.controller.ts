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

  @Post('change_password')
  changePassword(
    @Headers('oldPassword') oldPassword: string,
    @Headers('newPassword') newPassword: string
  ) {
    return this.client.send({ cmd: 'change_password' }, { oldPassword, newPassword });
  }

  @Post('reset_password')
  resetPassword(
    @Headers('newPassword') newPassword: string,
    @Headers('confirmPassword') confirmPassword: string
  ) {
    return this.client.send({ cmd: 'reset_password' }, { newPassword, confirmPassword });
  }

  @Post('logout')
  logout() {
    return this.client.send({ cmd: 'logout' }, {});
  }
}
