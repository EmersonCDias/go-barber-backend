"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("@config/auth"));
var AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
function ensureAuthenticated(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppErrors_1.default('Token is missing', 401);
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decoded.sub;
        req.user = {
            id: sub,
        };
        return next();
    }
    catch (_b) {
        throw new AppErrors_1.default('Invalid Token', 401);
    }
}
exports.default = ensureAuthenticated;
