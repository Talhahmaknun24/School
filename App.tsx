import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import Institute from './components/Institute';
import Students from './components/Students';
import Islamic from './components/Islamic';
import AIChat from './components/AIChat';
import Login from './components/Login';
import { auth } from './services/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Authentication State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });

    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
    }
    return () => unsubscribe();
  }, []);

  // Effect to apply dark mode class to HTML tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setView(AppView.DASHBOARD);
      } catch (error) {
        console.error("Logout error", error);
      }
  };

  if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
        </div>
      );
  }

  if (!user) {
      return <Login onLogin={(user) => setUser(user)} />;
  }

  const renderView = () => {
      switch (view) {
          case AppView.INSTITUTE:
              return <Institute onBack={() => setView(AppView.DASHBOARD)} />;
          case AppView.STUDENTS:
              return <Students onBack={() => setView(AppView.DASHBOARD)} />;
          case AppView.ISLAMIC:
              return <Islamic onBack={() => setView(AppView.DASHBOARD)} />;
          case AppView.ACADEMIC:
              return (
                  <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center animate-fade-in">
                      <div className="text-6xl text-purple-300 mb-4"><i className="fas fa-tools"></i></div>
                      <h2 className="text-2xl font-bold dark:text-white mb-2">একাডেমিক সেকশন নির্মাণাধীন</h2>
                      <p className="text-gray-500">শীঘ্রই আসছে...</p>
                      <button onClick={() => setView(AppView.DASHBOARD)} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">ফেরত যান</button>
                  </div>
              );
          default:
              return <Dashboard onChangeView={setView} stats={{ students: 1250, teachers: 45, modules: 1130, activeModules: 250 }} />;
      }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="cursor-pointer" onClick={() => setView(AppView.DASHBOARD)}>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                  <i className="fas fa-graduation-cap mr-3"></i>
                  <span>জাতীয় শিক্ষা ERP</span>
              </h1>
              <p className="text-blue-100 text-xs md:text-sm mt-1 hidden md:block">১০০০+ মডিউল সহ সম্পূর্ণ ডিজিটাল ব্যবস্থাপনা</p>
            </div>
            <div className="flex gap-3 items-center">
               <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
               >
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                  <img src="https://picsum.photos/40/40" alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
                  <span className="hidden md:inline font-semibold text-sm">{user.email?.split('@')[0]}</span>
              </div>

              <button 
                onClick={handleLogout} 
                className="bg-red-500/80 hover:bg-red-600 p-2 rounded-lg text-sm font-semibold transition-colors"
                title="Logout"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
          {renderView()}
      </main>

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;