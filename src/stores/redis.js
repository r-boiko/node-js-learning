import RedisStore from 'connect-redis';
import { createClient } from 'redis';

export const redisClient = createClient();
redisClient.connect().catch(console.error);

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
});
