import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepositoryMOCK implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async createAndSave({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidv4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(item =>
      isEqual(item.date, date),
    );

    return findAppointment;
  }
}

export default AppointmentsRepositoryMOCK;
