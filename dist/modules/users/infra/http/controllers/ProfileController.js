"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async show(req, res) {
    const user_id = req.user.id;
    const showUserProfile = await _tsyringe.container.resolve(_ShowProfileService.default);
    const user = await showUserProfile.run(user_id);
    return res.status(200).json((0, _classTransformer.classToClass)(user));
  }

  async update(req, res) {
    const user_id = req.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = req.body;
    const updateUser = await _tsyringe.container.resolve(_UpdateProfileService.default);
    const user = await updateUser.run({
      user_id,
      email,
      name,
      old_password,
      password
    });
    return res.status(200).json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;