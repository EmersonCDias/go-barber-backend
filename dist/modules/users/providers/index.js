"use strict";

var _tsyringe = require("tsyringe");

var _BCriptyHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCriptyHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashProvider', _BCriptyHashProvider.default);