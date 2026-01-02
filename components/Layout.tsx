
import React from 'react';
import { User, UserRole } from '../types';
import { LogOut, Home, User as UserIcon, BookOpen, LayoutDashboard, Users } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onHome: () => void;
  onSwitchAccount: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onHome, onSwitchAccount }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onHome}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">
              M
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">Mahabodhi</h1>
              <span className="text-xs opacity-90">Classes • शिक्षा ही शक्ति है</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {user?.role === UserRole.STUDENT && (
              <button 
                onClick={onSwitchAccount}
                className="p-2 hover:bg-orange-700 rounded-full transition-colors flex items-center space-x-2 bg-orange-700/50 px-3"
              >
                <Users size={18} />
                <span className="hidden sm:inline text-xs font-bold uppercase">Switch</span>
              </button>
            )}
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-orange-700 rounded-full transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 mb-24 md:mb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 shadow-2xl z-50 px-2">
        <button onClick={onHome} className="flex flex-col items-center text-orange-600">
          <Home size={22} />
          <span className="text-[10px] mt-1 font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <BookOpen size={22} />
          <span className="text-[10px] mt-1 font-bold">Courses</span>
        </button>
        <button onClick={onSwitchAccount} className="flex flex-col items-center text-gray-400">
          <Users size={22} />
          <span className="text-[10px] mt-1 font-bold uppercase">Switch</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          {user?.role === UserRole.ADMIN ? <LayoutDashboard size={22} /> : <UserIcon size={22} />}
          <span className="text-[10px] mt-1 font-bold">{user?.role === UserRole.ADMIN ? 'Admin' : 'Profile'}</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
