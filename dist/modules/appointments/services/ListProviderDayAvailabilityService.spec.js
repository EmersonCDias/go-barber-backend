"use strict";

var _AppointmentsRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/AppointmentsRepositoryMOCK"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let appointmentsRepositoryMOCK;
let listProviderDayAvailabilityService;
describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    appointmentsRepositoryMOCK = new _AppointmentsRepositoryMOCK.default();
    listProviderDayAvailabilityService = new _ListProviderDayAvailabilityService.default(appointmentsRepositoryMOCK);
  });
  it('should be able to list the available hours by date from provider', async () => {
    await appointmentsRepositoryMOCK.createAndSave({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await appointmentsRepositoryMOCK.createAndSave({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailabilityService.run({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 13,
      available: true
    }, {
      hour: 14,
      available: false
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});