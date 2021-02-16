"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepositoryMOCK {
  constructor() {
    this.users = [];
  }

  async createAndSaveUser(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuid.v4)()
    }, userData);
    this.users.push(user);
    return user;
  }

  async findAllProviders({
    except_user_id
  }) {
    let {
      users
    } = this;

    if (except_user_id) {
      users = this.users.filter(item => item.id !== except_user_id);
    }

    return users;
  }

  async findUserByEmail(email) {
    const findEmail = this.users.find(item => item.email === email);
    return findEmail;
  }

  async findUserById(id) {
    const findId = this.users.find(item => item.id === id);
    return findId;
  }

  async saveUser(user) {
    const findIndex = this.users.findIndex(item => item.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

}

exports.default = UsersRepositoryMOCK;