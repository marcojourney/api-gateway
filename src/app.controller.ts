import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('books')
export class AppController {
  constructor(@Inject('BOOK_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllBooks() {
    return this.client.send({cmd: 'get_books'}, {});
  }

  @Get(':id')
  getBookByID(@Param('id') id ) {
    return this.client.send({cmd: 'get_book'}, id);
  }

  @Delete(':id')
  deleteBookByID(@Param('id') id ) {
    return this.client.send({cmd: 'delete_book'}, id);
  }
}
