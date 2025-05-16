export function configCors(app: any) {
    app.enableCors({
      origin: ['http://127.0.0.1', 'http://ca.localhost:3000'],
      methods: 'GET,POST,PUT,DELETE,PATCH',
    });
}
  