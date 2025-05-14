import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StockHttpService } from './services/stock-client.service';

@Controller()
export class StockProxyController {
  constructor(private readonly stockHttpService: StockHttpService) {}

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    try {
      const responseData = await this.stockHttpService.forwardRequest(
        req.method,
        req.path,
        req.body,
        req.query,
        req.headers,
      );
      
      res.status(200).json(responseData);

    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Internal Server Error';
      res.status(status).json({ message });
    }
  }
}
