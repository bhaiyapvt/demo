
import React, { useState } from 'react';
import { 
  Users, BookOpen, IndianRupee, Video, FileText, Settings, 
  BarChart3, PlusCircle, CheckCircle2, X, Image as ImageIcon,
  ChevronDown, Search, Filter, Ban, CheckCircle, MoreVertical,
  Link as LinkIcon, Calendar, Video as VideoIcon
} from 'lucide-react';
import { CourseCategory, UserRole, MeetingPlatform, LiveClass } from '../types';
import { MOCK_ALL_STUDENTS, MOCK_COURSES, MOCK_LIVE_CLASSES } from '../mockData';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'STUDENTS' | 'LIVE_CLASSES'>('OVERVIEW');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: CourseCategory.CLASS_6_10,
    price: '',
    thumbnail: ''
  });

  const [liveFormData, setLiveFormData] = useState({
    title: '',
    platform: MeetingPlatform.GOOGLE_MEET,
    link: '',
    startTime: ''
  });

  // Student Filter States
  const [students, setStudents] = useState(MOCK_ALL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');

  const stats = [
    { label: 'Total Students', value: '1,284', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Courses Active', value: '24', icon: <BookOpen />, color: 'bg-green-500' },
    { label: 'Monthly Revenue', value: '₹48,500', icon: <IndianRupee />, color: 'bg-orange-500' },
    { label: 'Watch Time (hrs)', value: '12.4k', icon: <Video />, color: 'bg-purple-500' },
  ];

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    alert('कोर्स सफलतापूर्वक जोड़ा गया! (Course Added Successfully)');
    setIsAddModalOpen(false);
  };

  const handleAddLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    alert('लाइव क्लास शेड्यूल हो गई! (Live Class Scheduled)');
    setIsLiveModalOpen(false);
  };

  const toggleBlockStatus = (studentId: string) => {
    setStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, isBlocked: !s.isBlocked } : s
    ));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.phoneNumber.includes(searchQuery);
    const matchesClass = classFilter === 'All' || student.targetClass === classFilter;
    const matchesCourse = courseFilter === 'All' || student.enrolledCourses.includes(courseFilter);
    return matchesSearch && matchesClass && matchesCourse;
  });

  const uniqueClasses = ['All', ...Array.from(new Set(MOCK_ALL_STUDENTS.map(s => s.targetClass).filter(Boolean)))];

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex bg-gray-100 p-1 rounded-xl mt-4 w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('OVERVIEW')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'OVERVIEW' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('STUDENTS')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'STUDENTS' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Students
            </button>
            <button 
              onClick={() => setActiveTab('LIVE_CLASSES')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'LIVE_CLASSES' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Live Classes
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          {activeTab === 'OVERVIEW' && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl flex items-center text-sm font-bold shadow-lg shadow-orange-200 transition-all active:scale-95"
            >
              <PlusCircle size={18} className="mr-2" /> नया कोर्स
            </button>
          )}
          {activeTab === 'LIVE_CLASSES' && (
            <button 
              onClick={() => setIsLiveModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl flex items-center text-sm font-bold shadow-lg shadow-red-200 transition-all active:scale-95"
            >
              <VideoIcon size={18} className="mr-2" /> क्लास शुरू करें
            </button>
          )}
        </div>
      </div>

      {activeTab === 'OVERVIEW' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center">
                <div className={`p-3 rounded-xl text-white mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-2xl font-black text-gray-800">{stat.value}</span>
                <span className="text-xs text-gray-500 font-semibold mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold flex items-center text-gray-800">
                <Settings size={20} className="mr-2 text-gray-400" /> Content Management
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div onClick={() => setActiveTab('LIVE_CLASSES')} className="bg-white p-6 rounded-2xl border hover:border-red-300 cursor-pointer transition-colors group">
                  <VideoIcon className="text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold">Live Classes</h4>
                  <p className="text-xs text-gray-500 mt-1">Google Meet & Zoom sessions</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border hover:border-blue-300 cursor-pointer transition-colors group">
                  <FileText className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold">Study Materials</h4>
                  <p className="text-xs text-gray-500 mt-1">Upload PDFs and set permissions</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border hover:border-green-300 cursor-pointer transition-colors group">
                  <CheckCircle2 className="text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold">Tests & Exams</h4>
                  <p className="text-xs text-gray-500 mt-1">Create MCQs and view results</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border hover:border-purple-300 cursor-pointer transition-colors group">
                  <BarChart3 className="text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold">Analytics</h4>
                  <p className="text-xs text-gray-500 mt-1">View student progress & reports</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Recent Signups</h3>
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                {MOCK_ALL_STUDENTS.slice(0, 5).map((student) => (
                  <div key={student.id} className="flex items-center p-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <img src={student.profilePic} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div>
                      <h5 className="text-sm font-bold text-gray-800">{student.name}</h5>
                      <span className="text-[10px] text-gray-400">{student.targetClass} • Joined 2h ago</span>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setActiveTab('STUDENTS')}
                  className="w-full py-4 text-xs font-bold text-gray-400 hover:text-orange-600 bg-gray-50 transition-colors"
                >
                  VIEW ALL USERS
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'STUDENTS' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search students..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all text-sm"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <select className="flex-1 md:w-40 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" value={classFilter} onChange={e => setClassFilter(e.target.value)}>
                  {uniqueClasses.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : c}</option>)}
                </select>
                <select className="flex-1 md:w-48 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
                  <option value="All">All Courses</option>
                  {MOCK_COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 uppercase text-[10px] font-bold text-gray-400">
                    <th className="pb-4 px-4">Student</th>
                    <th className="pb-4 px-4">Class</th>
                    <th className="pb-4 px-4">Courses</th>
                    <th className="pb-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img src={student.profilePic} className="w-8 h-8 rounded-full mr-3 object-cover" />
                          <div><p className="font-bold text-sm">{student.name}</p><p className="text-[10px] text-gray-400">{student.phoneNumber}</p></div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">{student.targetClass}</td>
                      <td className="py-4 px-4 text-[10px]">{student.enrolledCourses.length} Courses</td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => toggleBlockStatus(student.id)} className={`p-2 rounded-lg ${student.isBlocked ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                          {student.isBlocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'LIVE_CLASSES' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Manage Live Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_LIVE_CLASSES.map(live => (
                <div key={live.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col">
                  <div className="flex justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${live.isLive ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {live.isLive ? 'Live' : 'Scheduled'}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {live.platform}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{live.title}</h4>
                  <p className="text-xs text-gray-500 mb-4">{live.startTime}</p>
                  <div className="mt-auto flex gap-2">
                    <a href={live.link} target="_blank" className="flex-1 text-center bg-white border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold hover:bg-gray-50">
                      Join Link
                    </a>
                    <button className="bg-red-50 text-red-600 px-3 py-2 rounded-xl hover:bg-red-100">
                      <Ban size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Live Class Modal */}
      {isLiveModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLiveModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-red-600 p-6 text-white flex justify-between">
              <h3 className="text-xl font-bold">शेड्यूल लाइव क्लास</h3>
              <button onClick={() => setIsLiveModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddLiveClass} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Class Title</label>
                <input required type="text" placeholder="e.g. Maths Chapter 1 Live" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-red-500" value={liveFormData.title} onChange={e => setLiveFormData({...liveFormData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Platform</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" value={liveFormData.platform} onChange={e => setLiveFormData({...liveFormData, platform: e.target.value as MeetingPlatform})}>
                    <option value={MeetingPlatform.GOOGLE_MEET}>Google Meet</option>
                    <option value={MeetingPlatform.ZOOM}>Zoom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Start Time</label>
                  <input required type="text" placeholder="e.g. 4:00 PM" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" value={liveFormData.startTime} onChange={e => setLiveFormData({...liveFormData, startTime: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Meeting Link</label>
                <div className="relative">
                  <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input required type="url" placeholder="Paste Meet/Zoom URL" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-red-500" value={liveFormData.link} onChange={e => setLiveFormData({...liveFormData, link: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all">
                Schedule & Start (क्लास शुरू करें)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-orange-600 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">नया कोर्स जोड़ें</h3>
                <p className="text-xs opacity-80 mt-1">Add a new course to the platform</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Course Name (कोर्स का नाम)</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Class 10 Social Science"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all font-medium"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description (विवरण)</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Tell students what they will learn..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all font-medium resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as CourseCategory})}
                  >
                    {Object.values(CourseCategory).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 bottom-4 text-gray-400 pointer-events-none" />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0 for FREE"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all font-medium"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Thumbnail URL</label>
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="url" 
                    placeholder="https://image-link.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all font-medium"
                    value={formData.thumbnail}
                    onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                  />
                </div>
                {formData.thumbnail && (
                   <div className="mt-3 rounded-lg overflow-hidden border border-gray-100 aspect-video bg-gray-50 flex items-center justify-center">
                     <img 
                       src={formData.thumbnail} 
                       alt="Preview" 
                       className="w-full h-full object-cover"
                       onError={(e) => (e.currentTarget.style.display = 'none')}
                     />
                   </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center"
              >
                Create Course (कोर्स बनाएं)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
