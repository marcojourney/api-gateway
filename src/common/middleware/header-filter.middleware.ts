import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderFilterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedHeaders = ['authorization', 'content-type', 'accept', 'user-agent'];

    const filteredHeaders = Object.fromEntries(
      Object.entries(req.headers || {}).filter(([key]) =>
        allowedHeaders.includes(key.toLowerCase())
      )
    );

    req.headers = filteredHeaders;

    next();
  }
}
