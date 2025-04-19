import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appointment } from '../types';

interface BookingState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  removeAppointment: (id: string) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      appointments: [],
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [
            ...state.appointments,
            { ...appointment, id: Date.now().toString() },
          ],
        })),
      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((app) => app.id !== id),
        })),
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        appointments: state.appointments,
      }),
    }
  )
); 