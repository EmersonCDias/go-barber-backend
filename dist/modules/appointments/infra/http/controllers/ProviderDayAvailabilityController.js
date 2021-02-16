"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAvailabilityController {
  async index(req, res) {
    const {
      provider_id
    } = req.params;
    const {
      day,
      month,
      year
    } = req.query;

    const listProviderDayAvailability = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availableDays = await listProviderDayAvailability.run({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return res.json(availableDays);
  }

}

exports.default = ProviderDayAvailabilityController;