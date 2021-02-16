"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _UserTokens = _interopRequireDefault(require("../../infra/typeorm/entities/UserTokens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserTokensRepositoryMOCK {
  constructor() {
    this.userTokens = [];
  }

  async generate(user_id) {
    const userToken = new _UserTokens.default();
    Object.assign(userToken, {
      id: (0, _uuid.v4)(),
      token: (0, _uuid.v4)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findUserByToken(token) {
    const userToken = this.userTokens.find(item => item.token === token);
    return userToken;
  }

}

exports.default = UserTokensRepositoryMOCK;