import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from '../DarkModeToggle';
import { useThemeStore } from '@/store/themeStore';

// Mock the theme store
jest.mock('@/store/themeStore');

describe('DarkModeToggle', () => {
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });
  });

  it('renders with light mode by default', () => {
    render(<DarkModeToggle />);
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  it('changes label when in dark mode', () => {
    (useThemeStore as jest.Mock).mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  it('calls toggleDarkMode when clicked', () => {
    render(<DarkModeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it('has correct tabIndex', () => {
    render(<DarkModeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });
}); 