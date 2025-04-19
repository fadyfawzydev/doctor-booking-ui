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
- **Testing**: Jest, React Testing Library
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
   npm run build
   npm start
   ```

## Testing Strategy

The project uses Jest and React Testing Library for comprehensive testing:

- **Component Tests**: Verify rendering and interaction
- **Accessibility Tests**: Ensure ARIA attributes and roles
- **Theme Tests**: Verify dark mode and high contrast functionality
- **State Management Tests**: Verify store actions and state updates

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
