declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_HOST: string;
      MONGO_DB_NAME: string;
      MONGO_USERNAME: string;
      MONGO_PASSWORD: string;
      MONGO_PORT: string;
      TS_NODE_DEV: string;
      NODE_ENV: 'production' | 'development';
    }
  }
}

export {};
