"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AppError {
  constructor(msg, statusCode = 400) {
    this.msg = void 0;
    this.statusCode = void 0;
    this.msg = msg;
    this.statusCode = statusCode;
  }

}

var _default = AppError;
exports.default = _default;