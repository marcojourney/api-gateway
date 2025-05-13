import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(@Inject('ORDERS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllOrders() {
    return this.client.send({ cmd: 'get_orders' }, {});
  }

  @Get(':id')
  getOrderByID(@Param('id') id) {
    return this.client.send({ cmd: 'get_order' }, id);
  }

  @Delete(':id')
  deleteOrderByID(@Param('id') id) {
    return this.client.send({ cmd: 'delete_order' }, id);
  }
}
