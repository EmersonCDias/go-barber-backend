"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _redis = _interopRequireDefault(require("redis"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _AppErrors = _interopRequireDefault(require("../../../errors/AppErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 1
});

async function rateLimiter(req, res, next) {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch {
    throw new _AppErrors.default('Too many requests', 429);
  }
}