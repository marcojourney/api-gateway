import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StockHttpService } from '../src/services/stock-client.service';
import { StockProxyController } from '../src/stock.proxy.controller';

describe('StockProxyController (Integration)', () => {
  let app: INestApplication;
  let stockHttpService: StockHttpService;

  const mockStockHttpService = {
    forwardRequest: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StockProxyController],
      providers: [
        {
          provide: StockHttpService,
          useValue: mockStockHttpService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    stockHttpService = moduleFixture.get<StockHttpService>(StockHttpService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should forward request with headers and query params', async () => {
    const responseMock = { message: 'forwarded successfully' };

    mockStockHttpService.forwardRequest.mockResolvedValueOnce(responseMock);

    await request(app.getHttpServer())
      .get('/products?category=books&limit=10')
      .set('Authorization', 'Bearer test-token')
      .expect(200)
      .expect(responseMock);

    expect(mockStockHttpService.forwardRequest).toHaveBeenCalledWith(
      'GET',
      '/products',
      {},
      { category: 'books', limit: '10' },
      expect.objectContaining({ authorization: 'Bearer test-token' }),
    );
  });

  it('should forward POST body and respond correctly', async () => {
    const body = { name: 'iPhone 15', stock: 100 };
    const responseMock = { status: 'created' };

    mockStockHttpService.forwardRequest.mockResolvedValueOnce(responseMock);

    await request(app.getHttpServer())
      .post('/items')
      .send(body)
      .expect(200)
      .expect(responseMock);

    expect(mockStockHttpService.forwardRequest).toHaveBeenCalledWith(
      'POST',
      '/items',
      body,
      {},
      expect.any(Object),
    );
  });

  it('should handle 400 Bad Request from upstream', async () => {
    mockStockHttpService.forwardRequest.mockRejectedValueOnce({
      response: {
        status: 400,
        data: 'Bad input',
      },
    });

    await request(app.getHttpServer())
      .put('/invalid-input')
      .send({ test: 'bad' })
      .expect(400)
      .expect({ message: 'Bad input' });
  });

  it('should fallback to 500 on unknown error', async () => {
    mockStockHttpService.forwardRequest.mockRejectedValueOnce(new Error('Oops'));

    await request(app.getHttpServer())
      .delete('/fail')
      .expect(500)
      .expect({ message: 'Internal Server Error' });
  });
});
