import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
//   @Throttle(5, 60)
  @Get('health')
  getHealth() {
    return { ok: true, message: 'API Gateway is healthy' };
  }
}
