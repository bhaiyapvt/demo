
import React, { useState, useEffect } from 'react';
import { User, UserRole, Course } from './types';
import { MOCK_STUDENT, MOCK_ADMIN, MOCK_ALL_STUDENTS } from './mockData';
import Layout from './components/Layout';
import StudentDashboard from './views/StudentDashboard';
import AdminDashboard from './views/AdminDashboard';
import CourseContent from './views/CourseContent';
import TestView from './views/TestView';
import LoginView from './views/LoginView';
import SpeedInsights from './components/SpeedInsights';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'HOME' | 'COURSE_DETAIL' | 'TEST_MODULE' | 'LOGIN'>('LOGIN');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<User[]>([]);

  // Load saved profiles from localStorage to simulate persistent device sessions
  useEffect(() => {
    const saved = localStorage.getItem('mahabodhi_profiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (role: UserRole, specificUser?: User) => {
    let user = specificUser || (role === UserRole.STUDENT ? MOCK_STUDENT : MOCK_ADMIN);
    
    // Add to saved profiles if it's a student and not already saved
    if (user.role === UserRole.STUDENT && !savedProfiles.find(p => p.id === user.id)) {
      const newProfiles = [...savedProfiles, user];
      setSavedProfiles(newProfiles);
      localStorage.setItem('mahabodhi_profiles', JSON.stringify(newProfiles));
    }

    setCurrentUser(user);
    setActiveView('HOME');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('LOGIN');
  };

  const handleSwitchUser = () => {
    setActiveView('LOGIN');
  };

  const navigateToCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveView('COURSE_DETAIL');
  };

  if (activeView === 'LOGIN') {
    return (
      <>
        <SpeedInsights />
        <LoginView 
          onLogin={handleLogin} 
          savedProfiles={savedProfiles}
        />
      </>
    );
  }

  return (
    <Layout 
      user={currentUser} 
      onLogout={handleLogout} 
      onHome={() => setActiveView('HOME')}
      onSwitchAccount={handleSwitchUser}
    >
      <SpeedInsights />
      {activeView === 'HOME' && currentUser?.role === UserRole.STUDENT && (
        <StudentDashboard 
          user={currentUser} 
          onCourseSelect={navigateToCourse} 
        />
      )}
      
      {activeView === 'HOME' && currentUser?.role === UserRole.ADMIN && (
        <AdminDashboard />
      )}

      {activeView === 'COURSE_DETAIL' && selectedCourse && (
        <CourseContent 
          course={selectedCourse} 
          onBack={() => setActiveView('HOME')}
          onTakeTest={() => setActiveView('TEST_MODULE')}
        />
      )}

      {activeView === 'TEST_MODULE' && selectedCourse && selectedCourse.tests[0] && (
        <TestView 
          test={selectedCourse.tests[0]} 
          onComplete={() => setActiveView('COURSE_DETAIL')}
        />
      )}
    </Layout>
  );
};

export default App;
