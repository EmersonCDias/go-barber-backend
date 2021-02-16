"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async createAndSaveUser(userData) {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async findAllProviders({
    except_user_id
  }) {
    let users;

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm.Not)(except_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  async findUserById(id) {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  async findUserByEmail(email) {
    const user = this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async saveUser(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;