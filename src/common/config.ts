import dotenv from 'dotenv';

dotenv.config();

type ConfigType = {
  PORT: string,
  NODE_ENV: string,
  MONGO_CONNECTION_STRING: string,
  JWT_SECRET_KEY: string,
  AUTH_MODE: boolean,
};

const config: ConfigType = {
  PORT: process.env.PORT || '4000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
};

export default config;
