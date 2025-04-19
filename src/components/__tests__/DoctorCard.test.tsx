import { render, screen, fireEvent } from '@testing-library/react';
import DoctorCard from '../DoctorCard';
import { useThemeStore } from '@/store/themeStore';

// Mock the theme store
jest.mock('@/store/themeStore');

describe('DoctorCard', () => {
  const mockDoctor = {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    rating: 4.8,
    availability: {
      days: ['Monday', 'Wednesday'],
      timeSlots: ['09:00', '10:00'],
    },
    location: 'Downtown Clinic',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: false,
      highContrast: false,
    });
  });

  it('renders doctor information correctly', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    expect(screen.getByText(mockDoctor.name)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.specialty)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.location)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.availability.days.join(', '))).toBeInTheDocument();
  });

  it('opens booking modal when book button is clicked', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    const bookButton = screen.getByText('Book Appointment');
    fireEvent.click(bookButton);

    expect(screen.getByText(`Book Appointment with ${mockDoctor.name}`)).toBeInTheDocument();
  });

  it('applies dark mode styles when dark mode is enabled', () => {
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: true,
      highContrast: false,
    });

    render(<DoctorCard doctor={mockDoctor} />);
    const card = screen.getByText(mockDoctor.name).parentElement?.parentElement?.parentElement?.parentElement;
    expect(card).toHaveClass('bg-gray-800');
  });

  it('applies high contrast styles when enabled', () => {
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: false,
      highContrast: true,
    });

    render(<DoctorCard doctor={mockDoctor} />);
    const bookButton = screen.getByText('Book Appointment');
    expect(bookButton).toHaveClass('bg-blue-800');
  });
}); 