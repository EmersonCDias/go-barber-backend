import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked!');

    // Create Appointments instance
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    // Save data in the DB
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
