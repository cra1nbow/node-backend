import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  port: Number.parseInt(process.env.PORT || '', 10) || 8080,
  api: {
    prefix: process.env.API_PREFIX || '',
  },
};

export default config;
