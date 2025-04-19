export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  location: string;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.8,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    location: 'Downtown Medical Center'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    rating: 4.9,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['08:00', '09:00', '10:00', '13:00', '14:00']
    },
    location: 'Children\'s Hospital'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    rating: 4.7,
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday'],
      timeSlots: ['10:00', '11:00', '14:00', '15:00', '16:00']
    },
    location: 'Skin Care Clinic'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    rating: 4.6,
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday'],
      timeSlots: ['08:00', '09:00', '13:00', '14:00', '15:00']
    },
    location: 'Sports Medicine Center'
  },
  {
    id: '5',
    name: 'Dr. Lisa Patel',
    specialty: 'Neurology',
    rating: 4.9,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    location: 'Neurological Institute'
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialty: 'Ophthalmology',
    rating: 4.8,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00']
    },
    location: 'Eye Care Center'
  },
  {
    id: '7',
    name: 'Dr. Maria Garcia',
    specialty: 'Endocrinology',
    rating: 4.7,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    location: 'Endocrine Specialists'
  },
  {
    id: '8',
    name: 'Dr. David Thompson',
    specialty: 'Gastroenterology',
    rating: 4.8,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['08:00', '09:00', '10:00', '13:00', '14:00']
    },
    location: 'Digestive Health Center'
  },
  {
    id: '9',
    name: 'Dr. Jennifer Lee',
    specialty: 'Psychiatry',
    rating: 4.9,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    location: 'Mental Health Clinic'
  },
  {
    id: '10',
    name: 'Dr. Ahmed Hassan',
    specialty: 'Urology',
    rating: 4.7,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00']
    },
    location: 'Urology Center'
  }
];

export const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty))); 