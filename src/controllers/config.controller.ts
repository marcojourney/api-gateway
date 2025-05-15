import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ConfigGateway } from '../common/config/config.gateway';

@Controller('config')
export class ConfigController {
  constructor(private configGateway: ConfigGateway) {}

  @Get(':key')
  getConfig(@Param('key') key: string) {
    return this.configGateway.get(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body('value') value: string) {
    // return this.configGateway.set(key, value);
  }
}
