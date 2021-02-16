"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importStar(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
var upload_1 = __importDefault(require("@config/upload"));
var AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
var rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
var routes_1 = __importDefault(require("./routes"));
require("@shared/infra/typeorm");
require("@shared/container");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(rateLimiter_1.default);
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, req, res, _) {
    if (err instanceof AppErrors_1.default) {
        return res.status(err.statusCode).json({
            status: 'error',
            msg: err.msg,
        });
    }
    console.log('==========>', err);
    return express_1.response.status(500).json({
        status: 'error',
        msg: 'Internal server erro',
    });
});
app.listen(3333, function () { return console.log('Server running at port 3333!'); });
