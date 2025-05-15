import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../../entities/config.entity';

@Injectable()
export class ConfigGateway {
  constructor(
    @InjectRepository(Config)
    private configRepo: Repository<Config>,
  ) {}

  async get(key: string): Promise<string> {
    const config = await this.configRepo.findOne({ where: { key } });
    return config?.value;
  }
}
