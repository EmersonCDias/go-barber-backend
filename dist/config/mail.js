"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'emerson_cdias@hotmail.com',
      name: 'Emerson Dias'
    }
  }
};
exports.default = _default;