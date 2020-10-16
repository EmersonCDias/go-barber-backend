import AppError from '@shared/errors/AppErrors';

import AppointmentsRepositoryMOCK from '../repositories/mocks/AppointmentsRepositoryMOCK';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentsRepositoryMOCK = new AppointmentsRepositoryMOCK();
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepositoryMOCK,
    );

    const appointment = await createAppointmentService.run({
      date: new Date(2020, 4, 10, 11),
      provider_id: '12345',
    });

    expect(appointment).toHaveProperty('id');
    expect(JSON.stringify(appointment.date)).toBe(
      JSON.stringify(new Date(2020, 4, 10, 11)),
    );
    expect(appointment.provider_id).toBe('12345');
  });

  it('should not be able to create two or more appointments on the same time', async () => {
    const appointmentsRepositoryMOCK = new AppointmentsRepositoryMOCK();
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepositoryMOCK,
    );

    const date = new Date();

    await createAppointmentService.run({
      date,
      provider_id: '12345',
    });

    await expect(
      createAppointmentService.run({
        date,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
