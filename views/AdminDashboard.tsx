
import React, { useState } from 'react';
import { 
  Users, BookOpen, IndianRupee, Video, FileText, Settings, 
  PlusCircle, X, Smartphone, ExternalLink, Shield, Download,
  Globe, Rocket, Cloud, HelpCircle, ArrowRight
} from 'lucide-react';
import { CourseCategory, MeetingPlatform } from '../types';
import { MOCK_ALL_STUDENTS } from '../mockData';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'STUDENTS' | 'DEPLOY'>('OVERVIEW');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats = [
    { label: 'Total Students', value: '1,284', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Courses Active', value: '24', icon: <BookOpen />, color: 'bg-green-500' },
    { label: 'Monthly Revenue', value: '₹48,500', icon: <IndianRupee />, color: 'bg-orange-500' },
    { label: 'Watch Time (hrs)', value: '12.4k', icon: <Video />, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8 relative pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Admin Dashboard</h2>
          <div className="flex bg-gray-100 p-1 rounded-2xl mt-4 w-fit border border-gray-200">
            <button 
              onClick={() => setActiveTab('OVERVIEW')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'OVERVIEW' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('STUDENTS')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'STUDENTS' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}
            >
              Students
            </button>
            <button 
              onClick={() => setActiveTab('DEPLOY')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center ${activeTab === 'DEPLOY' ? 'bg-white text-blue-600 shadow-md' : 'text-blue-500'}`}
            >
              <Smartphone size={16} className="mr-2" /> APK मोबाइल ऐप
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50 flex flex-col items-center text-center group hover:border-orange-100 transition-all">
              <div className={`p-4 rounded-2xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-3xl font-black text-gray-800 tracking-tighter">{stat.value}</span>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'DEPLOY' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-indigo-700 to-blue-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Deployment Hub</span>
              <h3 className="text-4xl font-black mt-4 leading-tight">सिर्फ 2 मिनट में <br/>अपना ऐप चालू करें</h3>
              <p className="mt-4 text-blue-100 font-medium text-lg max-w-md">होस्टिंग और APK बनाने का सबसे सरल तरीका यहाँ देखें।</p>
            </div>
            <Smartphone size={300} className="absolute -bottom-20 -right-20 opacity-10 rotate-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hosting Guide */}
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl mr-4">
                  <Cloud size={24} />
                </div>
                <h4 className="text-xl font-black text-gray-800 tracking-tight">Step 1: होस्टिंग (Hosting)</h4>
              </div>
              <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
                होस्टिंग का मतलब है अपने ऐप को इंटरनेट पर लाइव करना। इसके बिना APK नहीं बनेगा।
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-1">1</div>
                  <p className="ml-3 text-sm font-bold text-gray-700">Vercel.com पर अकाउंट बनाएं।</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-1">2</div>
                  <p className="ml-3 text-sm font-bold text-gray-700">"New Project" पर क्लिक करके कोड फोल्डर अपलोड करें।</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-1">3</div>
                  <p className="ml-3 text-sm font-bold text-gray-700">वहां से जो लिंक मिले (जैसे: mahabodhi.vercel.app), उसे कॉपी कर लें।</p>
                </div>
              </div>
              <a href="https://vercel.com" target="_blank" className="mt-8 flex items-center justify-center bg-gray-900 text-white py-4 rounded-2xl font-black text-xs shadow-lg">
                Vercel पर जाएं <ExternalLink size={14} className="ml-2" />
              </a>
            </div>

            {/* APK Guide */}
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl mr-4">
                  <Smartphone size={24} />
                </div>
                <h4 className="text-xl font-black text-gray-800 tracking-tight">Step 2: APK फाइल बनाना</h4>
              </div>
              <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
                अब अपनी वेबसाइट को मोबाइल ऐप (.apk) में बदलें।
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-1">1</div>
                  <p className="ml-3 text-sm font-bold text-gray-700">WebIntoApp.com खोलें।</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-1">2</div>
                  <p className="ml-3 text-sm font-bold text-gray-700">"URL" बॉक्स में अपना Vercel वाला लिंक डालें।</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-1">3</div>
                  <p className="ml-3 text-sm font-bold text-gray-700">अपना लोगो अपलोड करें और "Build APK" दबाएं।</p>
                </div>
              </div>
              <a href="https://www.webintoapp.com" target="_blank" className="mt-8 flex items-center justify-center bg-blue-600 text-white py-4 rounded-2xl font-black text-xs shadow-lg">
                APK जेनरेटर खोलें <ExternalLink size={14} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-8">
            <div className="flex items-start">
              <HelpCircle className="text-amber-600 mr-4 flex-shrink-0 mt-1" size={24} />
              <div>
                <h5 className="font-black text-amber-900">कुछ समझ नहीं आ रहा?</h5>
                <p className="text-sm text-amber-800 mt-2 leading-relaxed font-medium">
                  अगर आपको Vercel पर अपलोड करना कठिन लग रहा है, तो आप <b>Netlify.com</b> का इस्तेमाल कर सकते हैं। वहां सिर्फ फोल्डर "खींच कर छोड़ना" (Drag & Drop) होता है और वेबसाइट तुरंत लाइव हो जाती है। फिर उस लिंक को लेकर APK बना लें।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'STUDENTS' && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50">
          <h3 className="text-lg font-black mb-6">Registered Students</h3>
          <div className="space-y-4">
            {MOCK_ALL_STUDENTS.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center">
                  <img src={student.profilePic} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div className="ml-4">
                    <p className="font-bold text-gray-800">{student.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Class {student.targetClass}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Settings size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
