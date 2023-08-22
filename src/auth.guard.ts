import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { TokenPayload } from 'src/types/token.payload';
import { Session } from './entities/session.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Session) private sessionRepository: Repository<Session>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    
    const session = await this.sessionRepository.findOne({where: {accessToken}, select: ["accessToken"]});

    if (!session) {
      throw new UnauthorizedException();
    }

    const decoded: TokenPayload = plainToClass(TokenPayload, this.jwtService.decode(session.accessToken));
    
    if (!decoded.sub) {
      throw new UnauthorizedException('Invalid access token');
    }

    if (!decoded.scope || !decoded.scope.includes('read')) {
      throw new ForbiddenException('Insufficient privileges');
    }

    try {
      const payload = await this.jwtService.verifyAsync(session.accessToken, {secret: process.env.JWT_ACCESS_SECRET});
      
      request['user'] = payload;
    } catch(error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
