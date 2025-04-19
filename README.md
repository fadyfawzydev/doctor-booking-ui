# Doctor Booking System

A modern, accessible, and responsive web application for booking doctor appointments. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- View list of available doctors with their specialties and ratings
- Book appointments with doctors
- View and manage your appointments
- Filter doctors by specialty, day, and time
- Responsive design for all screen sizes

### Accessibility Features
- Dark mode support
- High contrast mode
- Adjustable font sizes
- Screen reader support with ARIA labels and live regions
- Keyboard navigation support
- Focus management in modals
- Semantic HTML structure

### User Experience
- Real-time filtering of doctors
- Visual feedback for booked time slots
- Clear appointment management
- Intuitive navigation between doctors and appointments
- Responsive design with mobile-first approach

## Tech Stack

- **Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Jest, React Testing Library, @testing-library/jest-dom
- **Development Tools**: Cursor IDE

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── __tests__/        # Component tests
│   ├── AccessibilitySettings.tsx
│   ├── AppointmentsList.tsx
│   ├── BookingModal.tsx
│   ├── DarkModeToggle.tsx
│   ├── DoctorCard.tsx
│   └── icons/            # SVG icons
├── data/                 # Mock data
│   └── mockData.ts
├── store/               # State management
│   ├── bookingStore.ts
│   └── themeStore.ts
└── types/              # TypeScript types
    └── index.ts
```

## Development with Cursor

This project was developed using Cursor IDE, which provided several advantages:

1. **AI-Powered Development**
   - Intelligent code completion
   - Context-aware suggestions
   - Automated code improvements
   - Real-time error detection

2. **Enhanced Productivity**
   - Quick file navigation
   - Integrated terminal
   - Git integration
   - Code refactoring tools

3. **Testing Support**
   - Integrated test runner
   - Test file generation
   - Test coverage visualization

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   # Start development server (standard)
   npm run dev

   # Start development server with Turbopack (experimental)
   npm run dev:turbo
   ```

3. **Testing**
   ```bash
   # Run all tests
   npm test

   # Run tests in watch mode
   npm run test:watch

   # Generate test coverage report
   npm run test:coverage
   ```

4. **Building for Production**
   ```bash
   # Build the application
   npm run build

   # Start the production server
   npm start
   ```

## Testing Strategy

The project uses Jest and React Testing Library for comprehensive testing:

- **Component Tests**: Verify rendering and interaction
  - Component rendering
  - User interactions
  - State changes
  - Props handling

- **Accessibility Tests**: Ensure ARIA attributes and roles
  - ARIA labels and roles
  - Keyboard navigation
  - Screen reader compatibility
  - Focus management

- **Theme Tests**: Verify dark mode and high contrast functionality
  - Theme switching
  - Color contrast
  - Font size changes
  - High contrast mode

- **State Management Tests**: Verify store actions and state updates
  - Appointment booking
  - Appointment cancellation
  - Theme state changes
  - Filter state management

## Development Workflow

1. **Code Organization**
   - Components are organized by feature
   - Tests are co-located with components
   - Types are centralized in the types directory
   - State management is handled by Zustand stores

2. **Testing Approach**
   - Unit tests for individual components
   - Integration tests for component interactions
   - Accessibility tests for ARIA compliance
   - State management tests for store actions

3. **Build Process**
   - Type checking with TypeScript
   - Linting with ESLint
   - Testing with Jest
   - Production build optimization

## Accessibility Features

1. **Visual Adjustments**
   - Dark mode toggle
   - High contrast mode
   - Font size controls

2. **Screen Reader Support**
   - ARIA labels for all interactive elements
   - Live regions for dynamic content
   - Proper heading structure
   - Descriptive alt text for images

3. **Keyboard Navigation**
   - Focus management in modals
   - Tab order optimization
   - Keyboard shortcuts for common actions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
