import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  drive: 'redis';
  config: {
    redis: RedisOptions;
  };
}

export default {
  diver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

// DATADOG - monitora quantas vezes uma chamada está sendo feita no banco para
// identificar se vale a pena cachear ou nao
