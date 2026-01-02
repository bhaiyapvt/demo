
import { Course, CourseCategory, User, UserRole, LiveClass, MeetingPlatform } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    name: 'कक्षा 10 गणित - सम्पूर्ण पाठ्यक्रम',
    description: 'Complete mathematics course for Class 10 Bihar Board/CBSE with focus on NCERT.',
    category: CourseCategory.MATRIC,
    price: 999,
    isFree: false,
    thumbnail: 'https://picsum.photos/seed/maths/800/450',
    lectures: [
      { id: 'v1', title: 'त्रिकोणमिति का परिचय', duration: '45:00', thumbnail: 'https://picsum.photos/seed/trig/400/225', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'v2', title: 'वास्तविक संख्याएं', duration: '30:00', thumbnail: 'https://picsum.photos/seed/num/400/225', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ],
    materials: [
      { id: 'm1', title: 'Math Formulas PDF', type: 'PDF', url: '#' },
      { id: 'm2', title: 'Chapter 1 Notes', type: 'NOTES', url: '#' }
    ],
    tests: [
      {
        id: 't1',
        title: 'Weekly Math Quiz - Real Numbers',
        durationMinutes: 20,
        questions: [
          { id: 'q1', question: 'What is the LCM of 12 and 15?', options: ['30', '45', '60', '90'], correctAnswer: 2 },
          { id: 'q2', question: 'Every composite number can be expressed as a product of primes?', options: ['True', 'False'], correctAnswer: 0 }
        ]
      }
    ]
  },
  {
    id: 'c2',
    name: 'विज्ञान (Physics) - Intermediate',
    description: 'Deep dive into Optics and Mechanics for 12th board exams.',
    category: CourseCategory.INTERMEDIATE,
    price: 0,
    isFree: true,
    thumbnail: 'https://picsum.photos/seed/physics/800/450',
    lectures: [
      { id: 'v3', title: 'Light Reflection', duration: '50:00', thumbnail: 'https://picsum.photos/seed/light/400/225', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ],
    materials: [],
    tests: []
  },
  {
    id: 'c3',
    name: 'Basic Hindi Grammar',
    description: 'Learn foundations of Hindi Vyakarana for primary classes.',
    category: CourseCategory.CLASS_1_5,
    price: 499,
    isFree: false,
    thumbnail: 'https://picsum.photos/seed/hindi/800/450',
    lectures: [],
    materials: [],
    tests: []
  }
];

export const MOCK_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'l1',
    title: 'Maths Doubt Session - Class 10',
    platform: MeetingPlatform.GOOGLE_MEET,
    link: 'https://meet.google.com/abc-defg-hij',
    startTime: 'Today, 04:00 PM',
    isLive: true,
    courseId: 'c1'
  },
  {
    id: 'l2',
    title: 'Physics Live Experiment',
    platform: MeetingPlatform.ZOOM,
    link: 'https://zoom.us/j/123456789',
    startTime: 'Tomorrow, 10:00 AM',
    isLive: false,
    courseId: 'c2'
  }
];

export const MOCK_STUDENT: User = {
  id: 's1',
  name: 'आकाश कुमार',
  role: UserRole.STUDENT,
  phoneNumber: '9876543210',
  targetClass: '10th',
  enrolledCourses: ['c1'],
  profilePic: 'https://i.pravatar.cc/150?u=s1'
};

export const MOCK_ALL_STUDENTS: (User & { isBlocked?: boolean })[] = [
  MOCK_STUDENT,
  {
    id: 's2',
    name: 'प्रिया शर्मा',
    role: UserRole.STUDENT,
    phoneNumber: '9123456780',
    targetClass: '12th',
    enrolledCourses: ['c2'],
    profilePic: 'https://i.pravatar.cc/150?u=s2',
    isBlocked: false
  },
  {
    id: 's3',
    name: 'राहुल वर्मा',
    role: UserRole.STUDENT,
    phoneNumber: '9988776655',
    targetClass: '10th',
    enrolledCourses: ['c1'],
    profilePic: 'https://i.pravatar.cc/150?u=s3',
    isBlocked: true
  },
  {
    id: 's4',
    name: 'सोनम कुमारी',
    role: UserRole.STUDENT,
    phoneNumber: '8877665544',
    targetClass: '8th',
    enrolledCourses: ['c3'],
    profilePic: 'https://i.pravatar.cc/150?u=s4',
    isBlocked: false
  },
  {
    id: 's5',
    name: 'अमित सिंह',
    role: UserRole.STUDENT,
    phoneNumber: '7766554433',
    targetClass: '12th',
    enrolledCourses: ['c2'],
    profilePic: 'https://i.pravatar.cc/150?u=s5',
    isBlocked: false
  }
];

export const MOCK_ADMIN: User = {
  id: 'admin1',
  name: 'Admin - Mahabodhi',
  role: UserRole.ADMIN,
  phoneNumber: '0000000000',
  enrolledCourses: []
};
