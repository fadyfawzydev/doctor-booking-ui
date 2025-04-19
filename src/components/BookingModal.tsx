import { Doctor } from '../data/mockData';
import { useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';
import CloseIcon from './icons/CloseIcon';

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ doctor, isOpen, onClose }: BookingModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { appointments, addAppointment } = useBookingStore();
  const { isDarkMode, highContrast } = useThemeStore();

  const bookedTimes = appointments
    .filter((appointment) => appointment.doctorId === doctor.id)
    .map((appointment) => appointment.time);

  const handleBooking = () => {
    if (!selectedTime) return;

    const today = new Date();
    const appointmentDate = today.toISOString().split('T')[0];

    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: appointmentDate,
      time: selectedTime,
      location: doctor.location,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={clsx(
          "rounded-lg p-6 max-w-md w-full",
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="modal-title"
            className={clsx(
              "text-xl font-semibold",
              isDarkMode ? 'text-white' : 'text-gray-800'
            )}
          >
            Book Appointment with {doctor.name}
          </h2>
          <button
            onClick={onClose}
            className={clsx(
              "transition-colors",
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
            )}
            aria-label="Close booking modal"
          >
            <CloseIcon />
          </button>
        </div>

        <div id="modal-description" className="sr-only">
          Select an available time slot for your appointment with {doctor.name}
        </div>

        <div className="mb-6">
          <h3
            className={clsx(
              "text-lg font-medium mb-2",
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            )}
          >
            Available Time Slots
          </h3>
          <div 
            className="grid grid-cols-2 gap-2"
            role="radiogroup"
            aria-label="Available time slots"
          >
            {doctor.availability.timeSlots.map((time) => {
              const isBooked = bookedTimes.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  disabled={isBooked}
                  className={clsx(
                    "p-2 rounded-md border transition-colors",
                    isBooked
                      ? clsx(
                          isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-gray-400'
                            : 'border-gray-300 bg-gray-100 text-gray-400',
                          'line-through cursor-not-allowed'
                        )
                      : selectedTime === time
                      ? highContrast
                        ? 'bg-blue-800 text-white border-blue-800'
                        : 'bg-blue-600 text-white border-blue-600'
                      : isDarkMode
                      ? 'border-gray-600 hover:border-blue-500'
                      : 'border-gray-300 hover:border-blue-500'
                  )}
                  role="radio"
                  aria-checked={selectedTime === time}
                  aria-disabled={isBooked}
                  aria-label={`${isBooked ? 'Booked time slot' : 'Select time slot'} ${time}`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={clsx(
              "px-4 py-2 border rounded-md transition-colors",
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            )}
            aria-label="Cancel booking"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={!selectedTime}
            className={clsx(
              "px-4 py-2 rounded-md transition-colors",
              !selectedTime
                ? clsx(
                    isDarkMode
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  )
                : highContrast
                ? 'bg-blue-800 text-white hover:bg-blue-900'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            )}
            aria-label="Confirm booking"
            aria-disabled={!selectedTime}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
} 