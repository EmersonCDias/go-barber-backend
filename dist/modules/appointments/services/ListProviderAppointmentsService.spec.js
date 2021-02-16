"use strict";

var _CacheProviderMOCK = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/CacheProviderMOCK"));

var _AppointmentsRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/AppointmentsRepositoryMOCK"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cacheProviderMOCK;
let appointmentsRepositoryMOCK;
let listProviderAppointmentsService;
describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    cacheProviderMOCK = new _CacheProviderMOCK.default();
    appointmentsRepositoryMOCK = new _AppointmentsRepositoryMOCK.default();
    listProviderAppointmentsService = new _ListProviderAppointmentsService.default(appointmentsRepositoryMOCK, cacheProviderMOCK);
  });
  it('should be able to list the appointments on a specific day for provider', async () => {
    const appointment1 = await appointmentsRepositoryMOCK.createAndSave({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointment2 = await appointmentsRepositoryMOCK.createAndSave({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    }); // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   return new Date(2020, 4, 20, 11).getTime();
    // });

    const appointmentsList = await listProviderAppointmentsService.run({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020
    });
    expect(appointmentsList).toEqual([appointment1, appointment2]);
  });
});