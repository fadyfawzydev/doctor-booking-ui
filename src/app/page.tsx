"use client";

import { useState, useEffect, useRef } from "react";
import { doctors, specialties } from "../data/mockData";
import DoctorCard from "../components/DoctorCard";
import AppointmentsList from "../components/AppointmentsList";
import AccessibilitySettings from "../components/AccessibilitySettings";
import DarkModeToggle from "../components/DarkModeToggle";
import { useThemeStore } from "../store/themeStore";
import { useBookingStore } from "../store/bookingStore";

export default function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"doctors" | "appointments">("doctors");
  const { isDarkMode, fontSize, highContrast } = useThemeStore();
  const { appointments } = useBookingStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);

  const announce = (message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
    }
  };

  const clearFilters = () => {
    setSelectedSpecialty("");
    setSelectedDay("");
    setSelectedTime("");
    announce("All filters cleared");
  };

  const hasActiveFilters = selectedSpecialty || selectedDay || selectedTime;

  const availableDays = Array.from(
    new Set(doctors.flatMap((doctor) => doctor.availability.days))
  ).sort();

  const availableTimes = Array.from(
    new Set(doctors.flatMap((doctor) => doctor.availability.timeSlots))
  ).sort();

  const bookedTimes = appointments.map((appointment) => appointment.time);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesDay = !selectedDay || doctor.availability.days.includes(selectedDay);
    const matchesTime = !selectedTime || doctor.availability.timeSlots.includes(selectedTime);
    return matchesSpecialty && matchesDay && matchesTime;
  });

  useEffect(() => {
    const message = filteredDoctors.length === 0
      ? "No doctors found matching your filters"
      : `Found ${filteredDoctors.length} doctor${filteredDoctors.length === 1 ? '' : 's'} matching your filters`;
    announce(message);
  }, [filteredDoctors.length, selectedSpecialty, selectedDay, selectedTime]);

  useEffect(() => {
    const message = activeTab === "doctors" 
      ? "Viewing doctors list" 
      : "Viewing your appointments";
    announce(message);
  }, [activeTab]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px',
    }[fontSize];
  }, [isDarkMode, fontSize, highContrast]);

  return (
    <main 
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      role="main"
      aria-label="Doctor Booking System"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 
          className={`text-3xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
          id="main-heading"
          aria-label="Main heading"
        >
          Doctor Booking System
        </h1>

        {/* Live Region for Announcements */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {activeTab === "doctors" && (
            <>
              {filteredDoctors.length === 0
                ? "No doctors found matching your filters"
                : `Found ${filteredDoctors.length} doctor${filteredDoctors.length === 1 ? '' : 's'} matching your filters`}
            </>
          )}
        </div>

        <div className="mb-8">
          <div className="flex space-x-4 mb-4" role="tablist" aria-label="Navigation tabs">
            <button
              onClick={() => setActiveTab("doctors")}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                activeTab === "doctors"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="View doctors list"
              aria-selected={activeTab === "doctors"}
              role="tab"
              tabIndex={activeTab === "doctors" ? 0 : -1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Find Doctors</span>
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                activeTab === "appointments"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="View your appointments"
              aria-selected={activeTab === "appointments"}
              role="tab"
              tabIndex={activeTab === "appointments" ? 0 : -1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>My Appointments</span>
            </button>
          </div>

          {activeTab === "doctors" && (
            <>
              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4">
                <button
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                    announce(isFilterOpen ? "Filters hidden" : "Filters shown");
                  }}
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-between ${
                    isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  aria-expanded={isFilterOpen}
                  aria-controls="filter-section"
                >
                  <span>Filters {hasActiveFilters ? `(${selectedSpecialty ? '1' : '0' + selectedDay ? '1' : '0' + selectedTime ? '1' : '0'} active)` : ''}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      isFilterOpen ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div 
                id="filter-section"
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ${
                  isFilterOpen ? 'block' : 'hidden md:grid'
                }`}
                role="group"
                aria-labelledby="filters-heading"
              >
                <h2 id="filters-heading" className="sr-only">Filter options</h2>
                
                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <div className="col-span-full flex justify-end">
                    <button
                      onClick={clearFilters}
                      className={`px-4 py-2 rounded-md text-sm ${
                        isDarkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                      aria-label="Clear all filters"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}

                <div className="relative">
                  <label
                    htmlFor="specialty"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Filter by Specialty
                  </label>
                  <div className="relative">
                    <select
                      id="specialty"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className={`block w-full pl-3 pr-10 py-2 rounded-md shadow-sm border transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } appearance-none`}
                      aria-label="Select specialty to filter doctors"
                    >
                      <option value="">All Specialties</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    {selectedSpecialty && (
                      <button
                        onClick={() => setSelectedSpecialty("")}
                        className={`absolute right-8 top-1/2 -translate-y-1/2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        aria-label="Clear specialty filter"
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    <div className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="day"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Filter by Day
                  </label>
                  <div className="relative">
                    <select
                      id="day"
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className={`block w-full pl-3 pr-10 py-2 rounded-md shadow-sm border transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } appearance-none`}
                    >
                      <option value="">All Days</option>
                      {availableDays.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <div className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="time"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Filter by Time
                  </label>
                  <div className="relative">
                    <select
                      id="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className={`block w-full pl-3 pr-10 py-2 rounded-md shadow-sm border transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } appearance-none`}
                    >
                      <option value="">All Times</option>
                      {availableTimes.map((time) => (
                        <option
                          key={time}
                          value={time}
                          disabled={bookedTimes.includes(time)}
                          className={bookedTimes.includes(time) ? 'text-gray-400 line-through' : ''}
                        >
                          {time} {bookedTimes.includes(time) ? '(Booked)' : ''}
                        </option>
                      ))}
                    </select>
                    <div className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {activeTab === "doctors" ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="region"
            aria-label="Doctors list"
          >
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <AppointmentsList />
        )}
      </div>

      <DarkModeToggle />
      <AccessibilitySettings />
    </main>
  );
}
