import {
    Injectable,
    ExecutionContext,
  } from '@nestjs/common';
  import { ThrottlerGuard } from '@nestjs/throttler';
  import { Request } from 'express';
  
  @Injectable()
  export class AdvancedThrottlerGuard extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): Promise<string> {
      // Identify by user ID, API key, or fallback to IP
      return req.headers['x-api-key']?.toString()
        ?? req.user?.id?.toString()
        ?? req.ip;
    }
  
    protected getLimit(context: ExecutionContext): number {
      const request = context.switchToHttp().getRequest<Request>();
      const apiKey = request.headers['x-api-key'];
  
      // Different limits based on plan/tier
      switch (apiKey) {
        case 'free-api-key': return 50;
        case 'pro-api-key': return 200;
        case 'internal-api-key': return 1000;
        default: return 20;
      }
    }
  
    protected getTTL(): number {
      return 60;
    }
  
    protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
      const res = context.switchToHttp().getResponse();
      res.setHeader('Retry-After', this.getTTL().toString());
      res.status(429).json({
        message: 'Too many requests. Please try again later.',
      });
    }
  }
  