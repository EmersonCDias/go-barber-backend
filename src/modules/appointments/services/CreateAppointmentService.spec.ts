import AppError from '@shared/errors/AppErrors';

import AppointmentsRepositoryMOCK from '../repositories/mocks/AppointmentsRepositoryMOCK';
import CreateAppointmentService from './CreateAppointmentService';

let appointmentsRepositoryMOCK: AppointmentsRepositoryMOCK;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    appointmentsRepositoryMOCK = new AppointmentsRepositoryMOCK();
    createAppointmentService = new CreateAppointmentService(
      appointmentsRepositoryMOCK,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.run({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user1',
      provider_id: 'user2',
    });

    expect(appointment).toHaveProperty('id');
    expect(JSON.stringify(appointment.date)).toBe(
      JSON.stringify(new Date(2020, 4, 10, 11)),
    );
    expect(appointment.user_id).toBe('user1');
    expect(appointment.provider_id).toBe('user2');
  });

  it('should not be able to create two or more appointments on the same time', async () => {
    const date = new Date();

    await createAppointmentService.run({
      date,
      user_id: 'user1',
      provider_id: 'user2',
    });

    await expect(
      createAppointmentService.run({
        date,
        user_id: 'user1',
        provider_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
