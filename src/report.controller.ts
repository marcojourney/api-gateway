import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('reports')
export class ReportController {
  constructor(@Inject('REPORT_SERVICE') private client: ClientProxy) {}

  @Get('/books')
  getBooksReport() {
    return this.client.send({cmd: 'get_books_report'}, {});
  }

  @Get('/orders')
  getOrdersReport() {
    return this.client.send({cmd: 'get_orders_report'}, {});
  }
}
