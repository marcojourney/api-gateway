import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Rate Limiting (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow requests within the limit', async () => {
    const maxRequests = 5;
    const endpoint = '/health';

    for (let i = 0; i < maxRequests; i++) {
      const res = await request(app.getHttpServer()).get(endpoint);
      expect(res.status).toBe(HttpStatus.OK);
    }
  });

  it('should block request after rate limit exceeded', async () => {
    const endpoint = '/health'; // same endpoint as before

    const res = await request(app.getHttpServer()).get(endpoint);
    expect(res.status).toBe(HttpStatus.TOO_MANY_REQUESTS);
    expect(res.body.message).toContain('Too many requests');
  });
});
