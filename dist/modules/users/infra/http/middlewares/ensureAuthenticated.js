"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppErrors = _interopRequireDefault(require("../../../../../shared/errors/AppErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _AppErrors.default('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded;
    req.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppErrors.default('Invalid Token', 401);
  }
}