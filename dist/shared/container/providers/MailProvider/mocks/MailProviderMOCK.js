"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class MailProviderMOCK {
  constructor() {
    this.message = [];
  }

  async sendMail(message) {
    this.message.push(message);
  }

}

exports.default = MailProviderMOCK;