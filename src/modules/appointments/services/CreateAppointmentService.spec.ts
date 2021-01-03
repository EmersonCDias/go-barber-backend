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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.run({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user1',
      provider_id: 'user2',
    });

    expect(appointment).toHaveProperty('id');
    expect(JSON.stringify(appointment.date)).toBe(
      JSON.stringify(new Date(2020, 4, 10, 13)),
    );
    expect(appointment.user_id).toBe('user1');
    expect(appointment.provider_id).toBe('user2');
  });

  it('should not be able to create two or more appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 13);

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

  it('should not be able to create an aapointment on a past date', async () => {
    // Simular que quando o método Date.now() for chamado, eu quero retornar um novo valor pra ele
    // É como se estivesse rescrevendo a implementação da função
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.run({
        date: new Date(2020, 4, 10, 11),
        user_id: 'user1',
        provider_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
