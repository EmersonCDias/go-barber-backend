"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    diver: 'redis',
    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASS || undefined,
        },
    },
};
// DATADOG - monitora quantas vezes uma chamada está sendo feita no banco para
// identificar se vale a pena cachear ou nao
