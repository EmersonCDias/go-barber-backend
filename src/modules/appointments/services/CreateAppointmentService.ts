import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppErrors';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async run({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    // Create Appointments instance
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Save data in the DB
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
