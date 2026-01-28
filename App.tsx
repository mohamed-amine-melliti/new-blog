import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedWork } from './components/FeaturedWork';
import { SpeakingSection } from './components/SpeakingSection';
import { Footer } from './components/Footer';
import { ArticlePage } from './components/ArticlePage';
import { AboutPage } from './components/AboutPage';
import { ResumePage } from './components/ResumePage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ArticleProvider } from './contexts/ArticleContext';
import { LoginPage } from './components/admin/LoginPage';
import { Dashboard } from './components/admin/Dashboard';
import { ArticleEditor } from './components/admin/ArticleEditor';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Extract the Home Page Layout
const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Divider Bar */}
        <div className="bg-black text-white py-4 overflow-hidden border-b-2 border-black">
          <div className="flex whitespace-nowrap animate-marquee">
             {[1,2,3,4,5,6].map(i => (
               <span key={i} className="mx-8 font-mono uppercase text-sm tracking-widest">
                 /// Software Engineering /// Artificial Intelligence /// Web Performance ///
               </span>
             ))}
          </div>
        </div>

        <FeaturedWork />
        
        <SpeakingSection />
        
        {/* About Teaser Section (Replaced by full page link, but kept as teaser) */}
        <section className="py-24 px-4 bg-white border-b-2 border-black">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-12 h-12 mx-auto mb-8 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              Hello, I'm MAM. I build <span className="underline decoration-4 decoration-fas-red underline-offset-8">Intelligent Systems</span>.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              I am a Full Stack Engineer and AI enthusiast, passionate about bridging the gap between complex ML models and intuitive user interfaces.
            </p>
            <a href="#/about" className="inline-block text-black font-bold uppercase border-2 border-black px-10 py-4 hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              More About Me
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ArticleProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resume" element={<ResumePage />} />
            
            {/* Admin Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/new" 
              element={
                <ProtectedRoute>
                  <ArticleEditor />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ArticleProvider>
    </AuthProvider>
  );
};

export default App;