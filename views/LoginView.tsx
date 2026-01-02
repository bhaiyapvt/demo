
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Phone, ArrowRight, ShieldCheck, Users, ChevronRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: UserRole, user?: User) => void;
  savedProfiles: User[];
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, savedProfiles }) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black mx-auto shadow-2xl shadow-orange-200 rotate-12 transition-transform hover:rotate-0 duration-500">
            M
          </div>
          <h1 className="mt-8 text-3xl font-black text-gray-900 tracking-tight">Mahabodhi Classes</h1>
          <p className="text-gray-500 font-medium">शिक्षा ही शक्ति है</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 mb-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</span>
                  <input 
                    type="tel" 
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold tracking-wider"
                  />
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={phone.length < 10}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-700 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
              >
                Get OTP <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-center text-gray-800">Account Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onLogin(UserRole.STUDENT)}
                  className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-2xl hover:border-orange-500 transition-all bg-gray-50 hover:bg-orange-50 group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-gray-400 group-hover:text-orange-600 transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="font-black text-[10px] text-gray-500 group-hover:text-orange-600 uppercase tracking-tighter">Student</span>
                </button>
                <button 
                  onClick={() => onLogin(UserRole.ADMIN)}
                  className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-2xl hover:border-gray-800 transition-all bg-gray-50 hover:bg-gray-100 group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-gray-400 group-hover:text-black transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="font-black text-[10px] text-gray-500 group-hover:text-black uppercase tracking-tighter">Admin</span>
                </button>
              </div>
              <button onClick={() => setStep(1)} className="w-full text-center text-xs font-bold text-gray-400 hover:text-orange-600">
                Change Number
              </button>
            </div>
          )}
        </div>

        {/* Recent Profiles Section (Shared Device Support) */}
        {savedProfiles.length > 0 && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <h4 className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
              <Users size={12} className="mr-2" /> Recent Students on this Phone
            </h4>
            <div className="space-y-2">
              {savedProfiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => onLogin(UserRole.STUDENT, profile)}
                  className="w-full bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-orange-300 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center">
                    <img 
                      src={profile.profilePic} 
                      className="w-10 h-10 rounded-full border-2 border-orange-50 object-cover" 
                      alt={profile.name}
                    />
                    <div className="ml-3 text-left">
                      <p className="text-sm font-bold text-gray-800">{profile.name}</p>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Class {profile.targetClass}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Secure Login • 256-bit Encryption
        </div>
      </div>
    </div>
  );
};

export default LoginView;
