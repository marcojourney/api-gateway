import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StockHttpService } from './services/stock-client.service';
import { maskSensitiveData } from './common/util';

@Controller('g8w4y-32as9v')
export class StockProxyController {
  private readonly logger = new Logger(StockProxyController.name, { timestamp: true });
  
  constructor(private readonly stockHttpService: StockHttpService) {}

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    try {
      const maskedBody = maskSensitiveData(req.body);
      const maskedHeaders = maskSensitiveData(req.headers);

      this.logger.log(`Incoming request: ${req.method} ${req.originalUrl}`);
      this.logger.debug(`Headers: ${JSON.stringify(maskedHeaders)}`);
      this.logger.debug(`Body: ${JSON.stringify(maskedBody)}`);

      const responseData = await this.stockHttpService.forwardRequest(
        req.method,
        req.path.replace(`/${process.env.GATEWAY_PREFIX}`, ''),
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
