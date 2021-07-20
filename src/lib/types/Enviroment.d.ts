declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      TS_NODE_DEV: string;
      NODE_ENV: 'production' | 'development';
    }
  }
}

export {};
