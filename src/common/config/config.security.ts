import { Request } from "express";

const csurf = require('csurf');

export function configSecurity(app: any) {
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      },
      value: (req: Request) => req.headers['x-csrf-token'] as string,
    }),
  );
}
