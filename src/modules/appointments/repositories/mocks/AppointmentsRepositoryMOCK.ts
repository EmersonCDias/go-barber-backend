import { v4 as uuidv4 } from 'uuid';
import { isEqual, getMonth, getYear } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      item =>
        item.provider_id === provider_id &&
        getMonth(item.date) + 1 === month &&
        getYear(item.date) === year,
    );

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(item =>
      isEqual(item.date, date),
    );

    return appointment;
  }
}

export default AppointmentsRepositoryMOCK;
