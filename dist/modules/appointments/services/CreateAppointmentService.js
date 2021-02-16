"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppointmentService {
  constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  async run({
    provider_id,
    date,
    user_id
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if (provider_id === user_id) {
      throw new _AppErrors.default('You can not create an appointment with yourself!');
    }

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppErrors.default('You can not create a new appointment on a past date!');
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppErrors.default('You can only make an appointment between 8h and 17h');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate({
      date: appointmentDate,
      provider_id
    });

    if (findAppointmentInSameDate) {
      throw new _AppErrors.default('This appointment is already booked!');
    }

    const appointment = await this.appointmentsRepository.createAndSave({
      provider_id,
      user_id,
      date: appointmentDate
    });
    const dateFormatter = (0, _dateFns.format)(appointmentDate, "dd-MM-yyyy 'às' HH");
    await this.notificationsRepository.create({
      content: `Novo agendamento para dia ${dateFormatter}h`,
      recipient_id: provider_id
    });
    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${(0, _dateFns.format)(appointmentDate, 'yyyy-M-d')}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;