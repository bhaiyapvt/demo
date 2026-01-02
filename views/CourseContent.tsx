
import React, { useState } from 'react';
import { Course, VideoLecture } from '../types';
import { ArrowLeft, Play, FileText, CheckCircle, Lock, ShieldCheck } from 'lucide-react';

interface CourseContentProps {
  course: Course;
  onBack: () => void;
  onTakeTest: () => void;
}

const CourseContent: React.FC<CourseContentProps> = ({ course, onBack, onTakeTest }) => {
  const [activeTab, setActiveTab] = useState<'LECTURES' | 'MATERIALS' | 'TESTS'>('LECTURES');
  const [currentVideo, setCurrentVideo] = useState<VideoLecture | null>(course.lectures[0] || null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
        <ArrowLeft size={18} className="mr-2" /> पीछे जाएँ
      </button>

      {/* Video Player Section */}
      <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-2xl relative group">
        {currentVideo ? (
          <video 
            key={currentVideo.videoUrl}
            className="w-full h-full"
            controls
            controlsList="nodownload"
            poster={currentVideo.thumbnail}
          >
            <source src={currentVideo.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <Lock size={48} className="text-gray-500 mb-4" />
            <p className="text-lg">No video selected</p>
          </div>
        )}
        
        {/* Anti-Screen Record Watermark (Simulated) */}
        <div className="absolute top-4 left-4 opacity-10 pointer-events-none text-white font-mono text-xs select-none">
          USER_ID: S1_9876543210
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{course.name}</h2>
          <div className="flex items-center text-green-600 text-sm mt-2 md:mt-0 font-semibold bg-green-50 px-3 py-1 rounded-full">
            <ShieldCheck size={16} className="mr-1" /> Secure Content
          </div>
        </div>
        <p className="text-gray-600 text-sm">{course.description}</p>
        
        <div className="flex border-b mt-8">
          {(['LECTURES', 'MATERIALS', 'TESTS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold transition-colors ${
                activeTab === tab 
                ? 'text-orange-600 border-b-2 border-orange-600' 
                : 'text-gray-400'
              }`}
            >
              {tab === 'LECTURES' ? 'वीडियो' : tab === 'MATERIALS' ? 'नोट्स' : 'टेस्ट'}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {activeTab === 'LECTURES' && (
            course.lectures.length > 0 ? (
              course.lectures.map((lecture, idx) => (
                <div 
                  key={lecture.id}
                  onClick={() => setCurrentVideo(lecture)}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                    currentVideo?.id === lecture.id ? 'border-orange-500 bg-orange-50 shadow-sm' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mr-4 font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800">{lecture.title}</h4>
                    <span className="text-xs text-gray-500">{lecture.duration} • MP4</span>
                  </div>
                  <Play size={16} className={currentVideo?.id === lecture.id ? 'text-orange-600' : 'text-gray-400'} />
                </div>
              ))
            ) : <p className="text-gray-500 text-center py-10">कोई वीडियो उपलब्ध नहीं है।</p>
          )}

          {activeTab === 'MATERIALS' && (
            course.materials.length > 0 ? (
              course.materials.map(material => (
                <div key={material.id} className="flex items-center p-4 rounded-xl border hover:bg-gray-50 cursor-pointer">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    <FileText size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800">{material.title}</h4>
                    <span className="text-xs text-gray-500">{material.type} • Restricted</span>
                  </div>
                  <button className="text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full">
                    View
                  </button>
                </div>
              ))
            ) : <p className="text-gray-500 text-center py-10">कोई नोट्स उपलब्ध नहीं हैं।</p>
          )}

          {activeTab === 'TESTS' && (
            course.tests.length > 0 ? (
              course.tests.map(test => (
                <div key={test.id} className="flex items-center p-4 rounded-xl border hover:bg-gray-50 cursor-pointer">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mr-4">
                    <CheckCircle size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800">{test.title}</h4>
                    <span className="text-xs text-gray-500">{test.questions.length} Questions • {test.durationMinutes} Mins</span>
                  </div>
                  <button 
                    onClick={onTakeTest}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
                  >
                    Start Test
                  </button>
                </div>
              ))
            ) : <p className="text-gray-500 text-center py-10">कोई टेस्ट उपलब्ध नहीं है।</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
