
import React, { useEffect, useState } from 'react';
import { User, Course, MeetingPlatform } from '../types';
import { MOCK_COURSES, MOCK_LIVE_CLASSES } from '../mockData';
import { Sparkles, ArrowRight, Play, Book, Video, ExternalLink, Smartphone, X } from 'lucide-react';
import { getAIPerformanceFeedback } from '../geminiService';

interface StudentDashboardProps {
  user: User;
  onCourseSelect: (course: Course) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onCourseSelect }) => {
  const [aiTip, setAiTip] = useState<string>("Loading personalized tip...");
  const [showInstallGuide, setShowInstallGuide] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      const dummyScores = [{ test: 'Math', score: 85 }, { test: 'Physics', score: 70 }];
      const tip = await getAIPerformanceFeedback(user.name, dummyScores);
      setAiTip(tip || "");
    };
    fetchTip();
  }, [user.name]);

  return (
    <div className="space-y-8 pb-10 page-transition">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black">नमस्ते, {user.name}!</h2>
            <p className="opacity-90 mt-1 font-medium">आज कुछ नया सीखते हैं।</p>
          </div>
          <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md">
            <Sparkles size={24} className="text-yellow-200" />
          </div>
        </div>
        
        <div className="mt-6 flex items-start space-x-3 bg-black/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
          <div className="text-sm">
            <p className="font-black text-yellow-200 uppercase tracking-widest text-[10px]">AI गुरु का सुझाव</p>
            <p className="mt-1 leading-relaxed italic text-white/90">{aiTip}</p>
          </div>
        </div>
      </div>

      {/* App Install Guide (For Non-Coder Users) */}
      {showInstallGuide && (
        <div className="bg-blue-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-lg animate-in slide-in-from-top-4 duration-500">
          <div className="relative z-10 flex items-center">
            <div className="bg-white/20 p-3 rounded-xl mr-4">
              <Smartphone size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">ऐप की तरह इस्तेमाल करें</p>
              <p className="text-[10px] opacity-80">Chrome Menu (⋮) > 'Install App' पर क्लिक करें</p>
            </div>
            <button 
              onClick={() => setShowInstallGuide(false)}
              className="absolute -top-2 -right-2 p-2"
            >
              <X size={16} />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        </div>
      )}

      {/* Live Classes Section */}
      <section className="animate-in fade-in duration-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black flex items-center text-gray-800">
            <Video className="mr-2 text-red-500" size={20} />
            लाइव क्लासेस
          </h3>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 no-scrollbar -mx-4 px-4">
          {MOCK_LIVE_CLASSES.map((live) => (
            <div 
              key={live.id} 
              className="flex-shrink-0 w-72 bg-white rounded-3xl border border-gray-100 p-5 shadow-sm active:scale-95 transition-transform"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${live.isLive ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500'}`}>
                  {live.isLive ? 'LIVE' : 'UPCOMING'}
                </span>
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                  {live.platform.toUpperCase()}
                </span>
              </div>
              <h4 className="font-bold text-gray-800 line-clamp-1">{live.title}</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{live.startTime}</p>
              
              <a 
                href={live.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`mt-4 w-full flex items-center justify-center py-3 rounded-2xl text-xs font-black transition-all ${
                  live.isLive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-100' 
                    : 'bg-gray-100 text-gray-400 pointer-events-none'
                }`}
              >
                {live.isLive ? 'अभी क्लास में जुड़ें' : 'जल्द ही शुरू होगा'}
                {live.isLive && <ExternalLink size={14} className="ml-2" />}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Enrolled Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black flex items-center text-gray-800">
            <Book className="mr-2 text-orange-600" size={20} />
            आपके कोर्सेज
          </h3>
          <button className="text-[10px] text-orange-600 font-black uppercase tracking-widest flex items-center">
            View All <ArrowRight size={12} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_COURSES.filter(c => user.enrolledCourses.includes(c.id)).map(course => (
            <div 
              key={course.id}
              onClick={() => onCourseSelect(course)}
              className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden active:scale-[0.98] transition-all flex h-32"
            >
              <img src={course.thumbnail} alt={course.name} className="w-1/3 h-full object-cover" />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-600">
                    {course.category}
                  </span>
                  <h4 className="font-bold text-gray-800 line-clamp-2 leading-tight mt-1">{course.name}</h4>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex -space-x-1">
                      {[1,2].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-white overflow-hidden">
                          <img src={`https://i.pravatar.cc/20?u=${i}`} alt="user" />
                        </div>
                      ))}
                      <span className="text-[8px] text-gray-400 self-center ml-2 font-bold">+1.2k more</span>
                   </div>
                   <div className="bg-orange-600 text-white p-2 rounded-xl shadow-lg shadow-orange-100">
                      <Play size={12} fill="white" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore More */}
      <section>
        <h3 className="text-lg font-black mb-4 text-gray-800 px-1">नये कोर्सेज</h3>
        <div className="flex overflow-x-auto pb-4 space-x-4 no-scrollbar -mx-4 px-4">
          {MOCK_COURSES.filter(c => !user.enrolledCourses.includes(c.id)).map(course => (
            <div 
              key={course.id}
              onClick={() => onCourseSelect(course)}
              className="flex-shrink-0 w-60 bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden"
            >
              <img src={course.thumbnail} alt={course.name} className="w-full h-28 object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{course.name}</h4>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-black text-green-600 text-sm">
                    {course.isFree ? 'FREE' : `₹${course.price}`}
                  </span>
                  <button className="text-[10px] bg-gray-900 text-white px-4 py-1.5 rounded-full font-black uppercase">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
