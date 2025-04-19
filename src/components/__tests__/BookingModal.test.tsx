import { render, screen, fireEvent } from '@testing-library/react';
import BookingModal from '../BookingModal';
import { useBookingStore } from '@/store/bookingStore';
import { useThemeStore } from '@/store/themeStore';

// Mock the stores
jest.mock('@/store/bookingStore');
jest.mock('@/store/themeStore');

describe('BookingModal', () => {
  const mockOnClose = jest.fn();
  const mockDoctor = {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    rating: 4.8,
    availability: {
      days: ['Monday', 'Wednesday'],
      timeSlots: ['09:00', '10:00', '11:00'],
    },
    location: 'Downtown Clinic',
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mock the theme store
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: false,
      highContrast: false,
    });

    // Mock the booking store to return empty appointments by default
    (useBookingStore as jest.Mock).mockReturnValue({
      appointments: [],
      addAppointment: jest.fn(),
    });
  });

  it('renders the modal with doctor information', () => {
    render(
      <BookingModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(`Book Appointment with ${mockDoctor.name}`)).toBeInTheDocument();
    expect(screen.getByText('Available Time Slots')).toBeInTheDocument();
  });

  it('displays available time slots', () => {
    render(
      <BookingModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    mockDoctor.availability.timeSlots.forEach((time) => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  it('disables booked time slots', () => {
    // Mock the booking store to return one booked appointment
    (useBookingStore as jest.Mock).mockReturnValue({
      appointments: [
        {
          doctorId: '1',
          time: '09:00',
        },
      ],
      addAppointment: jest.fn(),
    });

    render(
      <BookingModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const bookedSlot = screen.getByText('09:00').closest('button');
    expect(bookedSlot).toBeDisabled();
    expect(bookedSlot).toHaveClass('line-through');
  });

  it('enables selecting an available time slot', () => {
    render(
      <BookingModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const timeSlot = screen.getByText('10:00').closest('button');
    fireEvent.click(timeSlot!);

    const confirmButton = screen.getByText('Confirm Booking');
    expect(confirmButton).not.toBeDisabled();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <BookingModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByLabelText('Close booking modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
}); 