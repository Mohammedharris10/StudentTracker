import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Home, LayoutList, BookOpen, Trophy, ArrowRight, Trash2, RotateCcw } from 'lucide-react';

// Predefined list of activities to load if no local storage data exists
const initialActivities = [
  { id: 1, name: "HTML & CSS Basics", description: "Complete the introductory modules on semantic HTML and CSS Flexbox.", status: "Completed" },
  { id: 2, name: "JavaScript Fundamentals", description: "Finish the exercises on variables, loops, and functions.", status: "Pending" },
  { id: 3, name: "React Components", description: "Read the official React documentation on functional components and props.", status: "Pending" },
  { id: 4, name: "State Management", description: "Build a simple counter app using the useState hook.", status: "Pending" },
  { id: 5, name: "Build UI Wireframe", description: "Sketch the user interface for the final hackathon project.", status: "Pending" },
  { id: 6, name: "Submit Project Documentation", description: "Write the Ideation & Solution document and export as PDF.", status: "Pending" }
];

export default function App() {
  // State for Navigation ('home' or 'tracker')
  const [currentView, setCurrentView] = useState('home');
  
  // State for Activities. Initializes from LocalStorage if available, otherwise uses predefined list.
  const [activities, setActivities] = useState(() => {
    const savedData = localStorage.getItem('studentActivities');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse local storage data", e);
        return initialActivities;
      }
    }
    return initialActivities;
  });

  // Effect to save activities to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studentActivities', JSON.stringify(activities));
  }, [activities]);

  // Function to toggle the status of an activity
  const toggleActivityStatus = (id) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => {
        if (activity.id === id) {
          return {
            ...activity,
            status: activity.status === 'Pending' ? 'Completed' : 'Pending'
          };
        }
        return activity;
      })
    );
  };

  // Function to reset activities to their initial state (helpful for testing)
  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      setActivities(initialActivities);
    }
  };

  // Calculate Progress
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'Completed').length;
  const progressPercentage = totalActivities === 0 ? 0 : Math.round((completedActivities / totalActivities) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo / App Title */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentView('home')}
            >
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">StudyTrack</span>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-2 sm:gap-4">
              <button 
                onClick={() => setCurrentView('home')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Home size={18} />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button 
                onClick={() => setCurrentView('tracker')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'tracker' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <LayoutList size={18} />
                <span className="hidden sm:inline">Activities</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- HOME VIEW --- */}
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-6">
              <Trophy size={48} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Master Your Learning Journey
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              Welcome to StudyTrack! A simple, distraction-free environment to organize your academic tasks, track your daily learning activities, and monitor your progress without the hassle of complex setups.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setCurrentView('tracker')}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm hover:shadow-md"
              >
                Start Tracking Now
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Quick Stats on Home Page */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-md">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-slate-900 mb-1">{totalActivities}</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Total Tasks</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-blue-600 mb-1">{completedActivities}</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Completed</p>
              </div>
            </div>
          </div>
        )}

        {/* --- TRACKER VIEW --- */}
        {currentView === 'tracker' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">My Activities</h2>
                <p className="text-slate-500">Track your daily assignments and learning modules.</p>
              </div>
              <button 
                onClick={resetProgress}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors py-2 px-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-red-200 hover:bg-red-50"
                title="Reset all tasks to Pending"
              >
                <RotateCcw size={16} />
                <span>Reset Progress</span>
              </button>
            </div>

            {/* Progress Summary Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Overall Progress</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    <strong className="text-slate-900">{completedActivities}</strong> out of <strong className="text-slate-900">{totalActivities}</strong> activities completed
                  </p>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {progressPercentage}%
                </div>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                {/* Progress Bar Fill */}
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Activity List Section */}
            <div className="grid gap-4 md:grid-cols-2">
              {activities.map((activity) => {
                const isCompleted = activity.status === 'Completed';
                
                return (
                  <div 
                    key={activity.id} 
                    className={`group relative flex flex-col bg-white p-5 rounded-2xl border-2 transition-all duration-200 ${
                      isCompleted 
                        ? 'border-green-100 bg-green-50/30' 
                        : 'border-slate-100 hover:border-blue-100 hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      {/* Checkbox Toggle */}
                      <button 
                        onClick={() => toggleActivityStatus(activity.id)}
                        className={`mt-1 flex-shrink-0 focus:outline-none transition-transform active:scale-90 ${
                          isCompleted ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'
                        }`}
                        aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
                      >
                        {isCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                      </button>

                      {/* Activity Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-lg font-semibold transition-colors ${
                            isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
                          }`}>
                            {activity.name}
                          </h4>
                          
                          {/* Status Badge */}
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${
                            isCompleted 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                        
                        <p className={`text-sm leading-relaxed ${
                          isCompleted ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {activities.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No activities found. Add some tasks to get started!
              </div>
            )}
            
          </div>
        )}

      </main>
    </div>
  );
}
