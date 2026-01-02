
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export enum CourseCategory {
  CLASS_1_5 = 'Class 1-5',
  CLASS_6_10 = 'Class 6-10',
  MATRIC = 'Matric (Class 10)',
  INTERMEDIATE = 'Intermediate'
}

export enum MeetingPlatform {
  GOOGLE_MEET = 'Google Meet',
  ZOOM = 'Zoom'
}

export interface LiveClass {
  id: string;
  title: string;
  platform: MeetingPlatform;
  link: string;
  startTime: string;
  isLive: boolean;
  courseId?: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phoneNumber: string;
  email?: string;
  targetClass?: string;
  profilePic?: string;
  enrolledCourses: string[];
  isBlocked?: boolean;
}

export interface VideoLecture {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'NOTES';
  url: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface OnlineTest {
  id: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  category: CourseCategory;
  price: number;
  isFree: boolean;
  thumbnail: string;
  lectures: VideoLecture[];
  materials: StudyMaterial[];
  tests: OnlineTest[];
}

export interface TestResult {
  id: string;
  studentId: string;
  testId: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
}
