import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { TraceIdMiddleware } from '@middlewares/index';

export function configMiddlewares(app: any) {
  app.use(new TraceIdMiddleware().use);
  app.use(compression());
  app.use(cookieParser());
}
