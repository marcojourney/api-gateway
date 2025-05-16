import { LoggingInterceptor, MaskingInterceptor } from '@interceptors/index';
import { CsrfExceptionFilter } from '@common/filters/csrf-exception.filter';

export function configGlobalInterceptors(app: any) {
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new MaskingInterceptor()
  );
  app.useGlobalFilters(new CsrfExceptionFilter());
}
