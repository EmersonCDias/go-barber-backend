import AppointmentsRepositoryMOCK from '../repositories/mocks/AppointmentsRepositoryMOCK';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let appointmentsRepositoryMOCK: AppointmentsRepositoryMOCK;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService.spec', () => {
  beforeEach(() => {
    appointmentsRepositoryMOCK = new AppointmentsRepositoryMOCK();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      appointmentsRepositoryMOCK,
    );
  });

  it('should be able to list the available hours by date from provider', async () => {
    await appointmentsRepositoryMOCK.createAndSave({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await appointmentsRepositoryMOCK.createAndSave({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailabilityService.run({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
