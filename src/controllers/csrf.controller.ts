import { Controller, Get, Req } from '@nestjs/common';

@Controller('csrf')
export class CsrfController {
  @Get('token')
  getCsrfToken(@Req() req: any) {
    return { csrfToken: req.csrfToken() };
  }
}