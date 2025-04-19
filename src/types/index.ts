export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  location: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export interface BookingState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  removeAppointment: (id: string) => void;
} 