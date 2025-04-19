import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentsList from '../AppointmentsList';
import { useBookingStore } from '@/store/bookingStore';
import { useThemeStore } from '@/store/themeStore';

// Mock the stores
jest.mock('@/store/bookingStore');
jest.mock('@/store/themeStore');

describe('AppointmentsList', () => {
  const mockRemoveAppointment = jest.fn();
  const mockAppointments = [
    {
      id: '1',
      doctorId: '1',
      doctorName: 'Dr. John Doe',
      specialty: 'Cardiology',
      date: '2024-03-20',
      time: '09:00',
      location: 'Downtown Clinic',
    },
    {
      id: '2',
      doctorId: '2',
      doctorName: 'Dr. Jane Smith',
      specialty: 'Pediatrics',
      date: '2024-03-21',
      time: '10:00',
      location: 'Children\'s Hospital',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the theme store
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: false,
      highContrast: false,
    });

    // Mock the booking store
    (useBookingStore as jest.Mock).mockReturnValue({
      appointments: mockAppointments,
      removeAppointment: mockRemoveAppointment,
    });
  });

  it('renders no appointments message when empty', () => {
    (useBookingStore as jest.Mock).mockReturnValue({
      appointments: [],
      removeAppointment: mockRemoveAppointment,
    });

    render(<AppointmentsList />);
    expect(screen.getByText('No appointments booked yet.')).toBeInTheDocument();
  });

  it('renders all appointments', () => {
    render(<AppointmentsList />);

    mockAppointments.forEach((appointment) => {
      expect(screen.getByText(appointment.doctorName)).toBeInTheDocument();
      expect(screen.getByText(appointment.specialty)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(appointment.time))).toBeInTheDocument();
      expect(screen.getByText(appointment.location)).toBeInTheDocument();
    });
  });

  it('calls removeAppointment when cancel button is clicked', () => {
    render(<AppointmentsList />);

    const cancelButtons = screen.getAllByText('Cancel');
    fireEvent.click(cancelButtons[0]);

    expect(mockRemoveAppointment).toHaveBeenCalledWith(mockAppointments[0].id);
  });

  it('applies dark mode styles when enabled', () => {
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: true,
      highContrast: false,
    });

    render(<AppointmentsList />);
    const appointmentCards = screen.getAllByRole('listitem');
    appointmentCards.forEach(card => {
      expect(card).toHaveClass('bg-gray-800');
    });
  });

  it('applies high contrast styles when enabled', () => {
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: false,
      highContrast: true,
    });

    render(<AppointmentsList />);
    const cancelButtons = screen.getAllByText('Cancel');
    cancelButtons.forEach(button => {
      expect(button).toHaveClass('text-red-800');
    });
  });
}); 