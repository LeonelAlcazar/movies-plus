import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  api: {
    port: process.env.API_PORT || 3000,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  defaults: {
    operator: {
      email: process.env.DEFAULT_OPERATOR_EMAIL,
      password: process.env.DEFAULT_OPERATOR_PASSWORD,
    },
  },
}));
