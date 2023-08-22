import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = 'TOKEN';
    
    if (!accessToken) {
      return false;
    }

    return true;
  }
}
