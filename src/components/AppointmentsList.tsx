import { useBookingStore } from "../store/bookingStore";
import { useThemeStore } from "../store/themeStore";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function AppointmentsList() {
  const { appointments, removeAppointment } = useBookingStore();
  const { isDarkMode, highContrast } = useThemeStore();
  const [announcementKey, setAnnouncementKey] = useState(0);

  useEffect(() => {
    setAnnouncementKey((prev) => prev + 1);
  }, [appointments.length]);

  if (appointments.length === 0) {
    return (
      <>
        <div className="text-center py-8" role="status">
          <p
            tabIndex={0}
            className={clsx(
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}
          >
            No appointments booked yet.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        key={announcementKey}
      >
        {`You have ${appointments.length} appointment${
          appointments.length === 1 ? "" : "s"
        }`}
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={clsx(
              "p-4 rounded-lg shadow-md",
              isDarkMode ? "bg-gray-800" : "bg-white"
            )}
            role="listitem"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                <p className="text-sm text-gray-500">
                  {appointment.specialty}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(appointment.date).toLocaleDateString()} at{" "}
                  {appointment.time}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.location}
                </p>
              </div>
              <button
                onClick={() => removeAppointment(appointment.id)}
                className={clsx(
                  "transition-colors",
                  highContrast
                    ? "text-red-800 hover:text-red-900"
                    : "text-red-600 hover:text-red-800"
                )}
                aria-label={`Cancel appointment with ${appointment.doctorName} on ${new Date(
                  appointment.date
                ).toLocaleDateString()} at ${appointment.time}`}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
