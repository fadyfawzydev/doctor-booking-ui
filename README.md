# Doctor Booking UI Module

A responsive and accessible React application for booking doctor appointments, built with Next.js 15, Tailwind CSS, and Zustand.

## Features

- Doctor directory with filtering capabilities
- Booking modal for scheduling appointments
- Appointments management system
- Fully responsive design
- Accessible UI components
- State management with Zustand

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd doctor-booking-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  ├── app/
  │   └── page.tsx           # Main page component
  ├── components/
  │   ├── DoctorCard.tsx     # Doctor card component
  │   ├── BookingModal.tsx   # Booking modal component
  │   └── AppointmentsList.tsx # Appointments list component
  ├── store/
  │   └── bookingStore.ts    # Zustand store for appointments
  └── data/
      └── mockData.ts        # Mock data for doctors
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Known Limitations

1. Mock data is static and doesn't reflect real-time availability
2. No backend integration for actual booking system
3. No user authentication system
4. No persistent storage (appointments are stored in memory)

## Next Steps

1. Integrate with a backend API
2. Add user authentication
3. Implement persistent storage
4. Add real-time availability updates
5. Include doctor reviews and ratings
6. Add appointment reminders
7. Implement payment processing

## AI Tools Used

This project was developed with the assistance of AI tools for:
- Code generation and structure
- Accessibility best practices implementation
- Component design and layout
- State management patterns
- Responsive design implementation
