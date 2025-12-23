import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TeacherFeatures from './components/TeacherFeatures';
import StudentFeatures from './components/StudentFeatures';

import HowItWorks from './components/HowItWorks';
import WhyAtomicLearn from './components/WhyAtomicLearn';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Navbar />
        <main>
          <HeroSection />
          <TeacherFeatures />
          <StudentFeatures />
          <HowItWorks />
          <WhyAtomicLearn />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
