import { Doctor } from '../data/mockData';
import { useState } from 'react';
import BookingModal from './BookingModal';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, highContrast } = useThemeStore();

  const cardClasses = clsx(
    "rounded-lg p-6 mb-4 transition-all duration-200 shadow-md hover:shadow-lg",
    isDarkMode
      ? "bg-gray-800 hover:bg-gray-700"
      : "bg-white hover:bg-gray-50"
  );

  const textClasses = clsx(
    isDarkMode ? "text-gray-300" : "text-gray-600"
  );

  const buttonClasses = clsx(
    "px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    highContrast
      ? "bg-blue-800 text-white hover:bg-blue-900"
      : "bg-blue-600 text-white hover:bg-blue-700",
    isDarkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"
  );

  return (
    <div className={cardClasses}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2
              className={clsx(
                "text-xl font-semibold",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
            >
              {doctor.name}
            </h2>
            <p className={textClasses}>
              {doctor.specialty}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className={clsx("ml-1", isDarkMode ? "text-gray-300" : "text-gray-700")}>
              {doctor.rating}
            </span>
          </div>
        </div>

        <div className={textClasses}>
          <p className="mb-2">
            <span className="font-medium">Availability:</span>{' '}
            {doctor.availability.days.join(', ')}
          </p>
          <p>
            <span className="font-medium">Location:</span> {doctor.location}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className={buttonClasses}
          aria-label={`Book appointment with ${doctor.name}`}
        >
          Book Appointment
        </button>
      </div>

      {isModalOpen && (
        <BookingModal
          doctor={doctor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
} 