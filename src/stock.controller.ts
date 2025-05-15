import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class StockController {
  constructor(@Inject('STOCK_SERVICE') private client: ClientProxy) {}

  @Get()
  getList() {
    return this.client.send({ cmd: 'get_orders' }, {});
  }

  @Get(':id')
  getById(@Param('id') id) {
    return this.client.send({ cmd: 'get_order' }, id);
  }

  @Delete(':id')
  deleteStockAdjustments(@Param('id') id) {
    return this.client.send({ cmd: 'delete_order' }, id);
  }
}
