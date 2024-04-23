import { redisClient } from '../stores/redis.js';

const rateLimitMiddleware = (delimiter, limit = 10, duration = 60) => {
  return async (req, res, next) => {
    const key = `rl:${delimiter}`;
    const data = await redisClient.get(key);

    if (!data) {
      await redisClient.set(key, 1);
      await redisClient.expire(key, duration);

      next();
    } else {
      if (parseInt(data) >= limit) {
        return res.status(429).send('Too Many Requests');
      } else {
        await redisClient.incr(key);

        next();
      }
    }
  };
};

export const rateLimitByCodeMiddleware = (limit, duration) => {
  return (req, res, next) => {
    const code = req.params.code;

    return rateLimitMiddleware(`code:${code}`, limit, duration)(req, res, next);
  };
};

export const rateLimitByUserIdMiddleware = (limit, duration) => {
  return (req, res, next) => {
    const user = req.session.login;

    return rateLimitMiddleware(`userId:${user}`, limit, duration)(
      req,
      res,
      next,
    );
  };
};

export const rateLimitByIpMiddleware = (limit, duration) => {
  return (req, res, next) => {
    const ip = req.ip;

    return rateLimitMiddleware(`ip:${ip}`, limit, duration)(req, res, next);
  };
};
